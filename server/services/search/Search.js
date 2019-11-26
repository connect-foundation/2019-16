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
    const { params, query, key } = data;
    let result;

    switch (query) {
      case "searchAllStudyGroupWithFiltering":
        result = await queryMap.searchAllStudyGroupWithFiltering(params);
        break;
      case "searchAllStudyGroupWithFiltering2":
        await new Promise((res) => {
          setTimeout(() => {
            res()
          }, 3000)
        })
        result = { search2: "search2" }
        break;
      case "searchStudyGroup":
        result = await queryMap.searchStudyGroup(params);
        break;
      default:
        break;
    }
    const packet = makePacket("REPLY", "searchedStudyGroups", {}, { studygroups: result }, key, this.context);

    this.send(socket, packet);
  }
  send(socket, packet) {
    socket.write(packet);
  }
}

module.exports = Search;