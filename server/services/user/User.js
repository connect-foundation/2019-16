require("dotenv").config();

const mongoose = require("mongoose");
const App = require("../../lib/tcp/App");
const {
  updateJoiningGroups,
  updateOwnGroups,
  deleteGroupInUsers
} = require("./query/queries");

const { ACCOUNTS_MONGO_URL } = process.env;

mongoose
  .connect(ACCOUNTS_MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("User mongoDB is connected");
  })
  .catch(err => {
    console.log("User mongoDB connection fail", err);
  });

const queryMap = { updateJoiningGroups, updateOwnGroups, deleteGroupInUsers };

async function doJob(socket, data) {
  const { params, nextQuery } = data;

  let replyData;
  let method = "REPLY";
  let params_ = {};
  let result;

  try {
    result = await queryMap[nextQuery](params);
  } catch (e) {
    method = "ERROR";
    result = e;
  } finally {
    replyData = {
      ...data,
      method,
      curQuery: nextQuery,
      params: params_,
      body: result
    };
    const appClient = {};

    // this.send(appClient, replyData);
  }
}

class User extends App {
  constructor(name, host, port) {
    super(name, host, port, doJob);
  }
}
module.exports = User;
