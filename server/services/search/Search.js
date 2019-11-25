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

  const result = body.hits.hits.map((hit) => {
    return hit._source;
  })

  return result;
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
  const result = body.hits.hits.map((hit) => {
    return hit._source;
  })

  return result;
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