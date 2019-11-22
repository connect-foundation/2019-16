const Search = require("./Search");

const search = new Search("search", "127.0.0.1", 8002);
search.connectToAppListManager();
