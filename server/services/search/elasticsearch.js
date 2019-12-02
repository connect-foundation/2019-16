require("dotenv").config({ path: ".env.search" });
const { ELASTIC_HOST, ELASTIC_PORT, INDEX_STUDYGROUP } = process.env;

const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: `http://${ELASTIC_HOST}:${ELASTIC_PORT}` });

exports.searchStudyGroup = async info => {
  const { searchWord, isRecruit } = info;

  const { body } = await client.search({
    index: INDEX_STUDYGROUP,
    body: {
      query: {
        bool: {
          must: [
            {
              query_string: {
                query: `*${searchWord}*`,
                fields: ["title", "intro", "subtitle"]
              }
            }
          ],
          must_not: [
            {
              term: {
                isRecruiting: !isRecruit
              }
            }
          ]
        }
      }
    }
  });

  const result = body.hits.hits.map(hit => {
    return hit._source;
  });

  return result;
};

exports.searchStudyGroupWithCategory = async info => {
  const { searchWord, category, isRecruit } = info;

  const { body } = await client.search({
    index: INDEX_STUDYGROUP,
    body: {
      query: {
        bool: {
          must: [
            {
              query_string: {
                query: `*${searchWord}*`,
                fields: ["title", "intro"]
              }
            }
          ],
          must_not: [
            {
              term: {
                isRecruiting: !isRecruit
              }
            }
          ],
          filter: [
            {
              term: {
                category: category
              }
            }
          ]
        }
      }
    }
  });

  const result = body.hits.hits.map(hit => {
    return hit._source;
  });

  return result;
};

exports.tagStudyGroup = async info => {
  const { tags, isRecruit } = info;

  const prefixs = tags.reduce((acc, tag) => {
    acc.push({ prefix: { tags: { value: tag } } });
    return acc;
  }, []);

  console.log(prefixs);
  const { body } = await client.search({
    index: INDEX_STUDYGROUP,
    body: {
      query: {
        bool: {
          must_not: [
            {
              term: {
                isRecruiting: !isRecruit
              }
            }
          ],
          should: prefixs
        }
      }
    }
  });
  const result = body.hits.hits.map(hit => {
    return hit._source;
  });

  return result;
};

exports.tagStudyGroupWithCategory = async () => {};

exports.searchAllStudyGroup = async info => {
  const { isRecruit } = info;

  const { body } = await client.search({
    index: INDEX_STUDYGROUP,
    body: {
      query: {
        bool: {
          must: [
            {
              match_all: {}
            }
          ],
          filter: {
            term: {
              isRecruiting: isRecruit
            }
          }
        }
      }
    }
  });
  const result = body.hits.hits.map(hit => {
    return hit._source;
  });

  return result;
};

exports.searchAllStudyGroupWithCategory = async info => {
  const { category, isRecruit } = info;

  const { body } = await client.search({
    index: INDEX_STUDYGROUP,
    body: {
      query: {
        bool: {
          must: [
            {
              match_all: {}
            }
          ],
          filter: [
            {
              term: {
                isRecruiting: isRecruit
              }
            },
            {
              term: {
                category: category
              }
            }
          ]
        }
      }
    }
  });
  const result = body.hits.hits.map(hit => {
    return hit._source;
  });

  return result;
};

exports.bulkStudyGroups = async groups => {
  if (!Array.isArray(groups)) groups = [groups];
  const body = groups.flatMap(group => {
    const id = group.id;

    delete group.id;
    return [
      { index: { _index: INDEX_STUDYGROUP, _type: "_doc", _id: id } },
      group
    ];
  });

  const { body: bulkResponse } = await client.bulk({ refresh: true, body });

  if (bulkResponse.errors) {
    const erroredDocuments = [];

    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0];

      if (action[operation].error) {
        erroredDocuments.push({
          status: action[operation].status,
          error: action[operation].error,
          operation: body[i * 2],
          document: body[i * 2 + 1]
        });
      }
    });
    console.log(erroredDocuments);
  }
};
