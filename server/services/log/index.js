require("dotenv").config({ path: ".env" });
const { LOG_PORT, LOG_HOST, LOG_NAME } = process.env;
const elasticsearch = require("elasticsearch");
const elasticClient = new elasticsearch.Client({
  host: "http://210.89.189.171:9200/",
  log: "trace"
});

/**
 * TODO: elasticsearch로 데이터 정제하여 보내기
 */
class LogService extends require("../../lib/tcp/App") {
  constructor(name, host, port) {
    super(name, host, port);
    this.query = [];
    this.logMap = {};
  }

  async onRead(socket, data) {
    const { method, curQuery, body } = data;
    // console.log(data);
    const { timestamp } = body.data;

    const jsonData = await new Promise(resolve =>
      resolve(JSON.stringify(body.data))
    );

    if (curQuery === "log" && method === "POST") {
      elasticClient.index({
        index: "test",
        body: jsonData,
        id: timestamp
      });
    }
    // const replyPacket = makePacket(
    //   "REPLY",
    //   "log",
    //   {},
    //   { data: "it's finall data" },
    //   key,
    //   this.context
    // );

    // socket.write(replyPacket);
  }
}

const logService = new LogService(LOG_NAME, LOG_HOST, LOG_PORT);

// logService.connectToAppListManager();
