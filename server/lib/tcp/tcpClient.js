const net = require("net");
const { pushMessage } = require("../redis");
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
    this.isconnect = false;
    this.onEnd();
  });
  this.client.on("error", () => {
    this.isconnect = false;
    this.onError();
  });
}

class TcpClient {
  constructor(name, host, port, onCreate, onRead, onEnd, onError) {
    this.options = {
      host,
      port
    };
    this.name = name;
    this.onCreate = onCreate;
    this.onRead = onRead;
    this.onEnd = onEnd;
    this.onError = onError;
    this.isconnect = false;
  }
  connect() {
    this.client = net.connect(this.options, () => {
      console.log(`connet to ${this.options.host} : ${this.options.port}`);
      this.isconnect = true;
      this.onCreate();
    });
    registEvent.bind(this)();
  }

  write(data) {
    if (!this.isconnect) {
      pushMessage(this.name, data.slice(0, -1));
    } else {
      this.client.write(data);
    }
  }
  end() {
    this.client.end();
  }
}

module.exports = TcpClient;
