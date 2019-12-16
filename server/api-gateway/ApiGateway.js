const { GATEWAY_TCP_PORT, GATEWAY_NAME, GATEWAY_HOST } = process.env;
const App = require("../lib/tcp/App");
const { makeLogSender } = require("../lib/tcp/logUtils");

class ApiGateway extends App {
  constructor() {
    super(GATEWAY_NAME, GATEWAY_HOST, GATEWAY_TCP_PORT);
    this.appClientMap = {};
    this.isConnectMap = {};
    this.resMap = {};
    this.httpLogSender = makeLogSender.call(this, "http");
  }
  onRead(socket, data) {
    // data이벤트 함수
    if (data.method === "REPLY") {
      this.resMap[data.key].json(data.body);
    }
    if (data.method === "ERROR") {
      let error = new Error("서비스에서 에러가 발생했습니다.");

      this.resMap[data.key].status(error.status || 500);
      this.resMap[data.key].send(
        error.message || "서비스에서 에러가 발생했습니다."
      );
    }
    delete this.resMap[data.key];
  }
}

module.exports = new ApiGateway();
