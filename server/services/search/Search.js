require("dotenv").config({ path: ".env.search" });
const {
  ELASTIC_HOST,
  ELASTIC_PORT
} = process.env;

const App = require("../../lib/tcp/App");
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: `http://${ELASTIC_HOST}:${ELASTIC_PORT}` })


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

    switch (query) {
      case "searchStudyGroup":
        queryMap.searchStudyGroup(params);
        break;
      default:
        break;
    }
  }

}