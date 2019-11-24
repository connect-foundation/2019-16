const Search = require("./Search");

const search = new Search("search", "127.0.0.1", 8002);
search.connectToAppListManager();


const search2 = new Search("search2", "127.0.0.1", 8003);
search2.connectToAppListManager();