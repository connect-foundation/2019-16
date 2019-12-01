const App = require("../../lib/tcp/App");
const { popStudyGroups, getStudyGroupsLength } = require("../../lib/redis");
const { makePacket } = require("../../lib/tcp/util");
const { searchAllStudyGroupWithCategory, tagStudyGroup, tagStudyGroupWithCategory, searchAllStudyGroup, searchStudyGroup, searchStudyGroupWithCategory, bulkStudyGroups } = require("./elasticsearch")

const queryMap = {
  searchStudyGroup: searchStudyGroup,
  searchStudyGroupWithCategory: searchStudyGroupWithCategory,
  tagStudyGroup: tagStudyGroup,
  tagStudyGroupWithCategory: tagStudyGroupWithCategory,
  searchAllStudyGroup: searchAllStudyGroup,
  searchAllStudyGroupWithCategory: searchAllStudyGroupWithCategory
}

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

class Search extends App {
  constructor(name, host, port) {
    super(name, host, port);
    emptyStudyGroupPeriodically(30000);
  }
  async onRead(socket, data) {

    const { params, curQuery } = data;
    const replyData = { ...data };

    try {
      const result = await queryMap[curQuery](params);

      replyData.method = "REPLY";
      replyData.params = {};
      replyData.body = result;

    } catch (e) {
      replyData.method = "ERROR";
      replyData.params = {};
      replyData.body = e;

    } finally {
      this.send(socket, replyData);
    }
  }

}

module.exports = Search;