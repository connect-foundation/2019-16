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

function filterInDistance(maxResult, cur, accumulatedCount, res) {
  setTimeout(() => {
    const buckets = maxResult.body.aggregations.rings_around_amsterdam.buckets;
    const curCount = buckets[cur].doc_count;

    const resultCount = accumulatedCount + curCount;

    if (buckets.length - 1 === cur) {
      res(maxResult.body.hits.hits.slice(0, resultCount));
      return;
    }

    if (resultCount >= 20) {
      res(maxResult.body.hits.hits.slice(0, resultCount));
      return;
    }
    filterInDistance(maxResult, cur + 1, resultCount, res);
  }, 0);
}

async function reSearchInDistance(index, body, lat, lon, maxDistance = 20) {
  let distance = 2;

  body.sort = {
    _script: {
      type: "number",
      script: {
        lang: "expression",
        source:
          "(doc['location'].lat - lat )*(doc['location'].lat - lat ) + (doc['location'].lon - lon )*(doc['location'].lon - lon )",
        params: {
          lat: +lat,
          lon: +lon
        }
      },
      order: "asc"
    }
  };

  const geoFilter = {
    geo_distance: {
      distance: distance,
      location: {
        lat: +lat,
        lon: +lon
      }
    }
  };

  if (body.query.bool.filter !== undefined) {
    body.query.bool.filter.push(geoFilter);
  } else {
    body.query.bool.filter = [geoFilter];
  }

  body.aggs = {
    rings_around_amsterdam: {
      geo_distance: {
        field: "location",
        origin: `${+lat}, ${+lon}`,
        unit: "km",
        ranges: [
          { to: 2 },
          { from: 2, to: 4 },
          { from: 4, to: 6 },
          { from: 6, to: 8 },
          { from: 8, to: 10 },
          { from: 10, to: 12 },
          { from: 12, to: 14 },
          { from: 14, to: 16 },
          { from: 16, to: 18 },
          { from: 18, to: 20 }
        ]
      }
    }
  };
  body.size = 10000;
  const search = {
    index,
    body
  };

  search.body.query.bool.filter[
    search.body.query.bool.filter.length - 1
  ].geo_distance.distance = `${maxDistance}km`;

  let maxResult = await client.search(search);

  let searchResult = await new Promise(res =>
    filterInDistance(maxResult, 0, 0, res)
  );

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
  const result = searchResult.map(hit => {
    hit._source._id = hit._id;
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

  const result = searchResult.map(hit => {
    hit._source._id = hit._id;
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
  const result = searchResult.map(hit => {
    hit._source._id = hit._id;
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
  const result = searchResult.map(hit => {
    hit._source._id = hit._id;
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
  const result = searchResult.map(hit => {
    hit._source._id = hit._id;
    return hit._source;
  });

  return result;
};

exports.bulkStudyGroups = async groups => {
  if (!Array.isArray(groups)) groups = [groups];
  const body = groups.flatMap(group => {
    const objGroup = JSON.parse(group);
    const id = objGroup._id;

    delete objGroup._id;

    return [
      { index: { _index: SEARCH_INDEX_STUDYGROUP, _type: "_doc", _id: id } },
      objGroup
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
