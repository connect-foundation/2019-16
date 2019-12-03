require("dotenv").config();
const {
  SEARCH_ELASTIC_HOST,
  SEARCH_ELASTIC_PORT,
  SEARCH_INDEX_STUDYGROUP
} = process.env;

const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: `http://${SEARCH_ELASTIC_HOST}:${SEARCH_ELASTIC_PORT}`
});

async function reSearchInDistance(index, body, lat, lon, maxDistance = 20) {
  let distance = 2;
  let searchResult;
  const geoFilter = {
    geo_distance: {
      distance: distance,
      location: {
        lat: lat,
        lon: lon
      }
    }
  };

  if (body.query.bool.filter !== undefined) {
    body.query.bool.filter.push(geoFilter);
  } else {
    body.query.bool.filter = [geoFilter];
  }

  const search = {
    index,
    body
  };

  while (distance <= maxDistance) {
    search.body.query.bool.filter[
      search.body.query.bool.filter.length - 1
    ].geo_distance.distance = `${distance}km`;
    searchResult = await client.search(search);
    distance += 2;
    if (searchResult.body.hits.hits.length >= 10) break;
  }
  return searchResult;
}

exports.searchStudyGroup = async info => {
  const { searchWord, lat, lon, isRecruit } = info;
  const body = {
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
  };
  const searchResult = await reSearchInDistance(
    SEARCH_INDEX_STUDYGROUP,
    body,
    lat,
    lon,
    20
  );
  const result = searchResult.body.hits.hits.map(hit => {
    return hit._source;
  });

  return result;
};

exports.searchStudyGroupWithCategory = async info => {
  const { searchWord, category, lat, lon, isRecruit } = info;

  const body = {
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
  };
  const searchResult = await reSearchInDistance(
    SEARCH_INDEX_STUDYGROUP,
    body,
    lat,
    lon,
    20
  );

  const result = searchResult.body.hits.hits.map(hit => {
    return hit._source;
  });

  return result;
};

exports.tagStudyGroup = async info => {
  const { tags, lat, lon, isRecruit } = info;

  const prefixs = tags.reduce((acc, tag) => {
    acc.push({ prefix: { tags: { value: tag } } });
    return acc;
  }, []);
  const body = {
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
  };
  const searchResult = await reSearchInDistance(
    SEARCH_INDEX_STUDYGROUP,
    body,
    lat,
    lon,
    20
  );
  const result = searchResult.body.hits.hits.map(hit => {
    return hit._source;
  });

  return result;
};

exports.tagStudyGroupWithCategory = async () => {};

exports.searchAllStudyGroup = async info => {
  const { lat, lon, isRecruit } = info;

  const body = {
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
          }
        ]
      }
    }
  };
  const searchResult = await reSearchInDistance(
    SEARCH_INDEX_STUDYGROUP,
    body,
    lat,
    lon,
    20
  );
  const result = searchResult.body.hits.hits.map(hit => {
    return hit._source;
  });

  return result;
};

exports.searchAllStudyGroupWithCategory = async info => {
  const { category, lat, lon, isRecruit } = info;

  const body = {
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
  };

  const searchResult = await reSearchInDistance(
    SEARCH_INDEX_STUDYGROUP,
    body,
    lat,
    lon,
    20
  );
  const result = searchResult.body.hits.hits.map(hit => {
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
