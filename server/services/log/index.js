require("dotenv").config({ path: ".env" });
const LogService = require("./LogService");
const { LOG_PORT, LOG_HOST, LOG_NAME } = process.env;

const logService = new LogService(LOG_NAME, LOG_HOST, LOG_PORT);
