const App = require("../../lib/tcp/App");
const { popStudyGroups, getStudyGroupsLength } = require("../../lib/redis");

const {
  searchAllStudyGroupWithCategory,
  tagStudyGroup,
  tagStudyGroupWithCategory,
  searchAllStudyGroup,
  searchStudyGroup,
  searchStudyGroupWithCategory,
  bulkStudyGroups
} = require("./elasticsearch");

const queryMap = {
  searchStudyGroup: searchStudyGroup,
  searchStudyGroupWithCategory: searchStudyGroupWithCategory,
  tagStudyGroup: tagStudyGroup,
  tagStudyGroupWithCategory: tagStudyGroupWithCategory,
  searchAllStudyGroup: searchAllStudyGroup,
  searchAllStudyGroupWithCategory: searchAllStudyGroupWithCategory
};

function emptyStudyGroupPeriodically(timer) {
  setTimeout(async () => {
    console.log("empty studygroupqueue");
    let groups = await popStudyGroups(1000);

    if (groups.length !== 0) bulkStudyGroups(groups);
    const len = await getStudyGroupsLength();

    if (len !== 0) process.nextTick(emptyStudyGroupPeriodically, 0);
    else emptyStudyGroupPeriodically(timer);
  }, timer);
}

async function doJob(socket, data) {
  const { params, curQuery } = data;

  this.tcpLogSender(curQuery);

  let replyData;
  let method = "REPLY";
  let params_ = {};
  let result;

  try {
    result = await queryMap[curQuery](params);
  } catch (e) {
    method = "ERROR";
    result = e;
  } finally {
    replyData = {
      ...data,
      method,
      params: params_,
      body: result
    };
    const appClient = {};

    this.send(appClient, replyData);
  }
}
class Search extends App {
  constructor(name, host, port) {
    super(name, host, port, doJob);
    emptyStudyGroupPeriodically(30000);
  }

  async onRead(socket, data) {
    doJob.bind(this)(socket, data);
  }
}
module.exports = Search;
