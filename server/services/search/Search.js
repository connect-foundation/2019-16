const App = require("../../lib/tcp/App");
const { makePacket } = require("../../lib/tcp/util");
const { searchAllStudyGroupWithFiltering, searchStudyGroup, bulkStudyGroups } = require("./elasticsearch")

const queryMap = {
  searchStudyGroup: searchStudyGroup,
  searchAllStudyGroupWithFiltering: searchAllStudyGroupWithFiltering,
}

class Search extends App {
  constructor(name, host, port) {
    super(name, host, port);
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