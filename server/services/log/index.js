require("dotenv").config({ path: ".env" });
const App = require("../../lib/tcp/App");
const { LOG_PORT, LOG_HOST, LOG_NAME } = process.env;
const elasticsearch = require("elasticsearch");
const elasticClient = new elasticsearch.Client({
  host: "http://210.89.189.171:9200/",
  log: "trace"
});

function durationEndDataIsCome(spanId) {
  if (this.logMap.hasOwnProperty(spanId)) return true;
  return false;
}

function sendLog(logPacket, spanId) {
  console.log(`log Packtet ${JSON.stringify(logPacket)}`);
  console.log("before delete log map", this.logMap);
  new Promise(resolve => resolve(JSON.stringify(logPacket))).then(JSONData => {
    elasticClient.index({
      index: "test",
      body: JSONData,
      id: logPacket.timestamp
    });
    delete this.logMap[spanId];
    console.log(`after delete log in map \n`, this.logMap);
  });
}

function calculateDuration(spanId, durationEndData) {
  console.log("durationEndData is COME!!!!!!!!!!", spanId, durationEndData);

  const durationStartData = this.logMap[spanId];
  const durationStart = durationStartData.timestamp;
  const durationEnd = durationEndData.timestamp;

  const duration = durationEnd - durationStart;

  console.log(`--------------------------- duration is ${duration}`);

  const logPacket = { ...durationEndData, ...durationStartData, duration };

  sendLog.call(this, logPacket, spanId);
}

async function doJob(_socket, data) {
  const { method, nextQuery, body } = data;

  const { spanId } = body.data;

  if (nextQuery === "log" && method === "POST") {
    if (durationEndDataIsCome.call(this, spanId)) {
      calculateDuration.call(this, spanId, body.data);
    } else {
      this.logMap[spanId] = body.data;
    }
  }
}

class LogService extends App {
  constructor(name, host, port) {
    super(name, host, port, doJob);
    this.logMap = {};
  }
}

const logService = new LogService(LOG_NAME, LOG_HOST, LOG_PORT);
