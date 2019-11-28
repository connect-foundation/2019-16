require("dotenv").config({ path: "./server/services/log/.env.log" });
const { LOG_PORT } = process.env;
const { makePacket } = require("../../lib/tcp/util");

/**
 * TODO: elasticsearch로 데이터 정제하여 보내기
 */
class LogService extends require("../../lib/tcp/App") {
  constructor(name, host, port) {
    super(name, host, port);
    this.query = [];
  }

  async onRead(socket, data) {
    const { key } = data;

    console.log(`LOG:: ${JSON.stringify(data.body)}`);

    const replyPacket = makePacket(
      "REPLY",
      "log",
      {},
      { data: "it's finall data" },
      key,
      this.context
    );

    // socket.write(replyPacket);
  }
}

const logService = new LogService("log", "127.0.0.1", LOG_PORT);

// logService.connectToAppListManager();
