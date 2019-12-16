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

module.exports = client;
