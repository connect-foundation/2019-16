require("dotenv").config({ path: ".env.search" });
const {
  ELASTIC_HOST,
  ELASTIC_PORT
} = process.env;

const App = require("../../lib/tcp/App");
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: `http://${ELASTIC_HOST}:${ELASTIC_PORT}` })
const { makePacket } = require("../../lib/tcp/util");


async function searchStudyGroup(info) {
  const { searchWord, category, isRecruit, tags } = info;


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
              isRecruit: isRecruit
            }
          }
        }
      }
    }
  })

  return body.hits.hits;
}
async function searchAllStudyGroupWithFiltering(info) {
  const { category, isRecruit, tags } = info;


  const { body } = await client.search({
    index: 'studygroup',
    body: {
      query: {
        bool: {
          must: [{
            match_all: {}
          }],
          filter: {
            term: {
              isRecruit: isRecruit
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
  searchAllStudyGroupWithFiltering: searchAllStudyGroupWithFiltering,
}

class Search extends App {
  constructor(name, host, port) {
    super(name, host, port);
  }
  async onRead(socket, data) {
    const { params, query } = data;
    let result;

    switch (query) {
      case "searchAllStudyGroupWithFiltering":
        result = queryMap.searchAllStudyGroupWithFiltering(params);
        break;
      case "searchStudyGroup":
        result = queryMap.searchStudyGroup(params);
        break;
      default:
        break;
    }
    const packet = makePacket("REPLY", "searchedStudyGroups", {}, { studygroups: result }, this.context);

    this.send(socket, packet);
  }
  send(socket, packet) {
    socket.write(packet);
  }
}

module.exports = Search;