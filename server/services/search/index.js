require("dotenv").config({ path: ".env.search" });
const { APP_NAME, SERVER_HOST, SERVER_PORT } = process.env;

const Search = require("./Search");

const search = new Search(APP_NAME, SERVER_HOST, SERVER_PORT);

search.connectToAppListManager();
search.connectToLogService();
