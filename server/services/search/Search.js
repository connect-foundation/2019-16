require("dotenv").config({ path: ".env.search" });
const {
  ELASTIC_HOST,
  ELASTIC_PORT
} = process.env;

const App = require("../../lib/tcp/App");
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: `http://${ELASTIC_HOST}:${ELASTIC_PORT}` })



class Search extends App {
  constructor(name, host, port) {
    super(name, host, port);
  }


}