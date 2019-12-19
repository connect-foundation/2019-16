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
    const res = this.resMap[data.key];
    const traceId = res.getHeaders()["trace-id"];

    if (data.method === "REPLY") {
      res.json(data.body);
      this.httpLogSender({
        traceId: traceId,
        spanId: traceId,
        response: 200
      });
    }
    if (data.method === "ERROR") {
      let error = new Error("서비스에서 에러가 발생했습니다.");
      const status = error.status || 500;

      console.log("http error status ", status);
      res.status(error.status || 500);
      res.send(error.message || "서비스에서 에러가 발생했습니다.");
      this.httpLogSender({
        traceId: traceId,
        spanId: traceId,
        errors: status,
        errorMsg: error.message,
        response: Number(status)
      });
    }
    delete this.resMap[data.key];
  }
}

module.exports = new ApiGateway();
