const App = require("../../lib/tcp/App");
const { popStudyGroups, getStudyGroupsLength } = require("../../lib/redis");
const { makePacket } = require("../../lib/tcp/util");
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

class Search extends App {
  constructor(name, host, port) {
    super(name, host, port);
    emptyStudyGroupPeriodically(30000);
  }

  async onRead(socket, data) {
    let packet;
    const { params, query, key } = data;

    this.tcpLogSender(query);
    try {
      const result = await queryMap[query](params);

      packet = makePacket(
        "REPLY",
        query,
        {},
        { studygroups: result },
        key,
        this.context
      );
    } catch (e) {
      packet = makePacket(
        "ERROR",
        query,
        {},
        { message: e },
        key,
        this.context
      );
    } finally {
      this.send(socket, packet);
    }
  }

  send(socket, packet) {
    socket.write(packet);
  }
}

module.exports = Search;
