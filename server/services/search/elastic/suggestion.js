const { SEARCH_INDEX_STUDYGROUP, SEARCH_INDEX_QUERY } = process.env;
const client = require("./client");

const generateQuery = searchWord => {
  return {
    bool: {
      must: [
        {
          query_string: {
            query: `*${searchWord}*`,
            fields: ["query"]
          }
        }
      ]
    }
  };
};

exports.suggestQueries = async ({ searchWord }) => {
  const query = generateQuery(searchWord);
  const body = {
    query,
    sort: [
      {
        value: {
          order: "desc"
        }
      }
    ],
    size: 5
  };
  const search = {
    index: SEARCH_INDEX_QUERY,
    body
  };
  let searchResult = await client.search(search);

  const result = searchResult.body.hits.hits.map(hit => {
    hit._source._id = hit._id;
    return hit._source;
  });

  return result;
};

exports.addFirstQuery = async ({ searchWord }) => {
  const count = await this.getSuggestionCount(searchWord);

  if (count > 0) return;
  const body = {
    query: searchWord,
    count: 1,
    value: 0
  };
  const index = {
    index: SEARCH_INDEX_QUERY,
    type: "_doc",
    body
  };

  client.index(index);
};
exports.getSuggestionCount = async searchWord => {
  const query = {
    bool: {
      must: [
        {
          query_string: {
            query: `${searchWord}`,
            fields: ["query"]
          }
        }
      ]
    }
  };

  const body = { query };
  const count = {
    index: SEARCH_INDEX_QUERY,
    type: "_doc",
    body
  };

  const result = await client.count(count);

  return result.body.count;
};

exports.getQueryCount = async searchWord => {
  const query = {
    bool: {
      must: [
        {
          query_string: {
            query: `*${searchWord}*`,
            fields: ["title", "intro", "subtitle"]
          }
        }
      ]
    }
  };
  const body = { query };
  const count = {
    index: SEARCH_INDEX_STUDYGROUP,
    type: "_doc",
    body
  };

  const result = await client.count(count);

  return result.body.count;
};

exports.updateQueriesValue = async (searchWord, contentsCount) => {
  const query = generateQuery(searchWord);
  const body = {
    script: {
      source:
        "ctx._source.value = (ctx._source.count++)*0.6 +  params.contentsCount * 0.4",
      lang: "painless",
      params: {
        contentsCount
      }
    },
    query
  };

  const update = {
    index: SEARCH_INDEX_QUERY,
    conflicts: "proceed",
    body
  };

  client.updateByQuery(update);
};
