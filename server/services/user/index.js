require("dotenv").config();

const { USER_NAME, USER_HOST, USER_PORT } = process.env;

const User = require("./User");

const user = new User(USER_NAME, USER_HOST, USER_PORT);

user.connectToAppListManager();
