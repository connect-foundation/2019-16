require("dotenv").config({ path: ".env" });
const AppListManager = require("./AppListManager");
const { ALM_PORT, ALM_HOST } = process.env;
const appListManager = new AppListManager("AppListManager", ALM_HOST, ALM_PORT);
