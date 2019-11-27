const App = require("../../lib/tcp/App");
const { popStudyGroups, getStudyGroupsLength } = require("../../lib/redis");
const { makePacket } = require("../../lib/tcp/util");
const { searchAllStudyGroupWithFiltering, searchStudyGroup, bulkStudyGroups } = require("./elasticsearch")

const queryMap = {
  searchStudyGroup: searchStudyGroup,
  searchAllStudyGroupWithFiltering: searchAllStudyGroupWithFiltering,
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
    let packet;
    const { params, query, key } = data;

    try {
      let result;

      switch (query) {
        case "searchAllStudyGroupWithFiltering":
          result = await queryMap.searchAllStudyGroupWithFiltering(params);
          break;
        case "searchStudyGroup":
          result = await queryMap.searchStudyGroup(params);
          break;
        default:
          throw Error("잘못된 Query 입니다.")
      }
      packet = makePacket("REPLY", "searchedStudyGroups", {}, { studygroups: result }, key, this.context);
    } catch (e) {
      packet = makePacket("ERROR", "searchedStudyGroups", {}, { message: e }, key, this.context);
    } finally {
      this.send(socket, packet);
    }


  }
  send(socket, packet) {
    socket.write(packet);
  }
}

module.exports = Search;