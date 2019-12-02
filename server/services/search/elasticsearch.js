require("dotenv").config({ path: ".env" });
const {
  SEARCH_ELASTIC_HOST,
  SEARCH_ELASTIC_PORT,
  SEARCH_INDEX_STUDYGROUP
} = process.env;

const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: `http://${SEARCH_ELASTIC_HOST}:${SEARCH_ELASTIC_PORT}`
});

exports.searchStudyGroup = async info => {
  const { searchWord, userLocation, isRecruit } = info;
  let distance = 2;
  let body;
  while (distance <= 20) {
    body = await client.search({
      index: SEARCH_INDEX_STUDYGROUP,
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
            ],
            filter: {
              geo_distance: {
                distance: `${distance}km`,
                location: {
                  lat: userLocation.lat,
                  lon: -userLocation.lon
                }
              }
            }
          }
        }
      }
    }).body;

    distance = distance * 1.5;
    if (body.hits.hits.length >= 10) break;
  }

  const result = body.hits.hits.map(hit => {
    return hit._source;
  });
  return result;
};

exports.searchStudyGroupWithCategory = async info => {
  const { searchWord, category, userLocation, isRecruit } = info;

  const { body } = await client.search({
    index: SEARCH_INDEX_STUDYGROUP,
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
  const { tags, userLocation, isRecruit } = info;

  const prefixs = tags.reduce((acc, tag) => {
    acc.push({ prefix: { tags: { value: tag } } });
    return acc;
  }, []);
  const { body } = await client.search({
    index: SEARCH_INDEX_STUDYGROUP,
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
  const { lat, lon, isRecruit } = info;
  let distance = 2;

  const body = await new Promise(async res => {
    let body_;
    while (distance <= 20) {
      const { body } = await client.search({
        index: SEARCH_INDEX_STUDYGROUP,
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
                  geo_distance: {
                    distance: `${distance}km`,
                    location: {
                      lat: lat,
                      lon: lon
                    }
                  }
                }
              ]
            }
          }
        }
      });
      body_ = body;
      distance = distance * 1.5;
      if (body.hits.hits.length >= 10) break;
    }
    res(body_);
  });

  const result = body.hits.hits.map(hit => {
    return hit._source;
  });

  return result;
};

exports.searchAllStudyGroupWithCategory = async info => {
  const { category, userLocation, isRecruit } = info;

  const { body } = await client.search({
    index: SEARCH_INDEX_STUDYGROUP,
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
      { index: { _index: SEARCH_INDEX_STUDYGROUP, _type: "_doc", _id: id } },
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
