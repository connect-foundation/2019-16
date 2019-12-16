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

exports.suggestQueries = async info => {
  const { searchWord } = info;
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
    index: "suggestedquery",
    body
  };
  let searchResult = await client.search(search);

  const result = searchResult.body.hits.hits.map(hit => {
    hit._source._id = hit._id;
    return hit._source;
  });

  return result;
};

exports.updateQueriesValue = async info => {
  const { searchWord, contentsCount } = info;
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
    index: "suggestedquery",
    body
  };

  client.updateByQuery(update);
};
