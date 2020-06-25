require("dotenv").config({ path: ".env" });
const { LOG_ELASTIC_HOST, LOG_ELASTIC_PORT } = process.env;

const { Client } = require("@elastic/elasticsearch");
const elasticClient = new Client({
  node: `http://${LOG_ELASTIC_HOST}:${LOG_ELASTIC_PORT}`
});

module.exports = elasticClient;
