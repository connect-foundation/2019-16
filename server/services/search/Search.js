const App = require("../../lib/tcp/App");
const {
  popStudyGroups,
  getStudyGroupsLength,
  emptyStudyGroups
} = require("../../lib/redis/studygroup");

const {
  searchAllStudyGroupWithCategory,
  tagStudyGroup,
  tagStudyGroupWithCategory,
  searchAllStudyGroup,
  searchStudyGroup,
  searchStudyGroupWithCategory,
  bulkStudyGroups
} = require("./elastic/group");

const { suggestQueries } = require("./elastic/suggestion");

const queryMap = {
  searchStudyGroup,
  searchStudyGroupWithCategory,
  tagStudyGroup,
  tagStudyGroupWithCategory,
  searchAllStudyGroup,
  searchAllStudyGroupWithCategory,
  suggestQueries
};

function emptyStudyGroupPeriodically(timer) {
  setTimeout(async () => {
    console.log("empty studygroupqueue");

    const groupsForAdd = await popStudyGroups("add", 1000);
    const groupsForUpdate = await popStudyGroups("update", 1000);
    const groupsForRemove = await popStudyGroups("remove", 1000);

    if (
      groupsForAdd.length !== 0 ||
      groupsForUpdate.length !== 0 ||
      groupsForRemove.length !== 0
    ) {
      try {
        await bulkStudyGroups(groupsForAdd, groupsForUpdate, groupsForRemove);
        emptyStudyGroups("add", 1000);
        emptyStudyGroups("update", 1000);
        emptyStudyGroups("remove", 1000);
        let len =
          (await getStudyGroupsLength("add")) +
          (await getStudyGroupsLength("update")) +
          (await getStudyGroupsLength("remove"));

        if (len !== 0) process.nextTick(emptyStudyGroupPeriodically, 0);
        else emptyStudyGroupPeriodically(timer);
      } catch (e) {
        console.log(e);
        emptyStudyGroupPeriodically(1000);
      }
    } else emptyStudyGroupPeriodically(timer);
  }, timer);
}

async function doJob(socket, data) {
  const { params, nextQuery } = data;

  let replyData;
  let method = "REPLY";
  let params_ = {};
  let result;

  try {
    result = await queryMap[nextQuery](params);
  } catch (e) {
    method = "ERROR";
    result = e;
  } finally {
    replyData = {
      ...data,
      method,
      curQuery: nextQuery,
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
    emptyStudyGroupPeriodically(10000);
  }
}
module.exports = Search;
