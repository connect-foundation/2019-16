const App = require("../../lib/tcp/App");
const indexLog = require("./elastic/query");

class LogService extends App {
  constructor(name, host, port) {
    super(name, host, port, doJob);
    this.logMap = {};
  }
}

function durationEndDataIsCome(spanId) {
  if (this.logMap.hasOwnProperty(spanId)) return true;
  return false;
}

function sendLog(logPacket, spanId) {
  console.log(`log Packtet ${JSON.stringify(logPacket)}`);
  console.log("before delete log map", this.logMap);
  new Promise((resolve) => resolve(JSON.stringify(logPacket)))
    .then((JSONData) => {
      indexLog(JSONData, logPacket.timestamp);
      delete this.logMap[spanId];
      console.log(`after delete log in map \n`, this.logMap);
    })
    .catch((err) => {
      console.log(err);
    });
}

function calculateDuration(spanId, durationEndData) {
  console.log("durationEndData is COME!!!!!!!!!!", spanId, durationEndData);

  const durationStartData = this.logMap[spanId];
  const durationStart = durationStartData.timestamp;
  const durationEnd = durationEndData.timestamp;

  const duration = durationEnd - durationStart;

  console.log(`--------------------------- duration is ${duration}`);

  const logPacket = { ...durationStartData, ...durationEndData, duration };

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

module.exports = LogService;
