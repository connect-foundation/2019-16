require("dotenv").config({ path: ".env.search" });
const {
  ELASTIC_HOST,
  ELASTIC_PORT,
  INDEX_STUDYGROUP,
} = process.env;

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: `http://${ELASTIC_HOST}:${ELASTIC_PORT}` })


exports.searchStudyGroup = async (info) => {
  const { searchWord, category, isRecruit, tags } = info;

  const { body } = await client.search({
    index: INDEX_STUDYGROUP,
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
exports.searchAllStudyGroupWithFiltering = async (info) => {
  const { category, isRecruit, tags } = info;


  const { body } = await client.search({
    index: INDEX_STUDYGROUP,
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

