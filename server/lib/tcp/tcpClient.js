const net = require("net");
const logger = require("../../services/logger/logger");
const { PACKET_SPLITTER } = require("./util");

function registEvent() {
  this.client.on("data", data => {
    let mergedPacket = !this.data
      ? data.toString()
      : this.data.concat(data.toString());

    const packets = mergedPacket.split(PACKET_SPLITTER);

    packets.forEach((packet, index) => {
      if (
        mergedPacket[mergedPacket.length - 1] !== PACKET_SPLITTER &&
        index === packets.length - 1
      ) {
        mergedPacket = packets[index];
        return;
      }
      if (packet === "") {
        return;
      }
      this.onRead(JSON.parse(packet));
    });
  });

  this.client.on("end", () => {
    this.onEnd();
  });
  this.client.on("error", () => {
    this.onError();
  });
}

class TcpClient {
  constructor(host, port, onCreate, onRead, onEnd, onError) {
    this.options = {
      host,
      port
    };
    this.onCreate = onCreate;
    this.onRead = onRead;
    this.onEnd = onEnd;
    this.onError = onError;
  }
  connect() {
    this.client = net.connect(this.options, () => {
      logger.info(`connet to ${this.options.host} : ${this.options.port}`);
      this.onCreate();
    });
    registEvent.bind(this)();
  }
  write(data) {
    this.client.write(data);
  }
}

module.exports = TcpClient;
