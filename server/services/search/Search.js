require("dotenv").config({ path: ".env.search" });
const {
  ELASTIC_HOST,
  ELASTIC_PORT
} = process.env;

const App = require("../../lib/tcp/App");
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: `http://${ELASTIC_HOST}:${ELASTIC_PORT}` })
const { makePacket, makeKey } = require("../../lib/tcp/util");


async function searchStudyGroup(info) {
  const { searchWord, category, status, tags } = info;


  const { body } = await client.search({
    index: 'studygroup',
    body: {
      query: {
        bool: {
          must: [{
            match: {
              title: searchWord
            }
          }],
          filter: {
            term: {
              isRecruit: true
            }
          }
        }
      }
    }
  })

  return body.hits.hits;
}
const queryMap = {
  searchStudyGroup: searchStudyGroup,
}

class Search extends App {
  constructor(name, host, port) {
    super(name, host, port);
  }
  async onRead(socket, data) {
    const { params, query } = data;
    let result;

    switch (query) {
      case "searchStudyGroup":
        result = queryMap.searchStudyGroup(params);
        break;
      default:
        break;
    }
    const packet = makePacket("REPLY", "searchedGroups", {}, { studygroups: result }, this.context);

    this.send(socket, packet);
  }
  send(socket, packet) {
    socket.write(packet);
  }
}

module.exports = Search;