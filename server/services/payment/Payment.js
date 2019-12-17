const App = require("../../lib/tcp/App");
const mongoose = require("mongoose");
const { PAYMENTS_MONGO_URL } = process.env;
const { inspectQueue } = require("./query/queries");
const queryMap = { inspectQueue };

mongoose
  .connect(PAYMENTS_MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Payment mongoDB is connected");
  })
  .catch(e => {
    console.error("Payment mongoDB connection fail");
    console.error(e);
  });

async function doJob(socket, data) {
  const { params, nextQuery } = data;
  let result, method, replyData;

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

    this.send(appClient, replyData);
  }
}

class Payment extends App {
  constructor(name, host, port) {
    super(name, host, port, doJob);
  }
}

module.exports = Payment;
