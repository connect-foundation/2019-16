require("dotenv").config();

const { SEARCH_NAME, SEARCH_HOST, SEARCH_PORT, CACHE_HOST } = process.env;

const Search = require("./Search");

const search = new Search(SEARCH_NAME, SEARCH_HOST, SEARCH_PORT);

search.connectToAppListManager();
