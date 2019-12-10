const mongoose = require("mongoose");
const App = require("../../lib/tcp/App");
const { filterStudyGroup } = require("./query/queries");

const { RESERVATIONS_MONGO_URL } = process.env;

mongoose
  .connect(RESERVATIONS_MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Rservation mongoDB is connected");
  })
  .catch(err => {
    console.log("Rservation mongoDB connection fail", err);
  });

const queryMap = {
  filterStudyGroup
};

async function doJob(socket, data) {
  const { params, curQuery } = data;

  this.tcpLogSender(curQuery);

  let replyData;
  let method = "REPLY";
  let params_ = {};
  let result;

  try {
    result = await queryMap[curQuery](params);
  } catch (e) {
    method = "ERROR";
    result = e;
  } finally {
    replyData = {
      ...data,
      method,
      params: params_,
      body: result
    };
    const appClient = {};

    this.send(appClient, replyData);
  }
}

class Reservation extends App {
  constructor(name, host, port) {
    super(name, host, port, doJob);
  }
}
module.exports = Reservation;
