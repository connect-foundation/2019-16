const App = require("../../lib/tcp/App");

const queryMap = {};

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
