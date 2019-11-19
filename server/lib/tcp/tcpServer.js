const net = require("net");
const logger = require("../../services/logger/logger");
const { makeKey, PACKET_SPLITTER } = require("./util");

class TcpServer {
  constructor(name, host, port, query) {
    this.context = {
      name,
      host,
      port,
      query
    };

    this.dataMap = {};
    this.isConnectToDistributor = false;
    this.server = net.createServer(socket => {
      this.onCreate(socket);

      socket.on("close", () => {
        this.onClose(socket);
      });

      socket.on("data", async data => {
        const key = await makeKey(socket);

        let mergedPacket = !this.dataMap[key]
          ? data.toString()
          : this.dataMap[key].concat(data.toString());

        const packets = mergedPacket.split(PACKET_SPLITTER);

        packets.forEach((packet, index) => {
          if (
            mergedPacket[mergedPacket.length - 1] !== PACKET_SPLITTER &&
            index === packets.length - 1
          ) {
            this.dataMap[key] = packets[index];
            return;
          }
          if (packet === "") return;
          this.onRead(socket, JSON.parse(packet));
        });
      });
    });
    this.server.listen(port, host, () => {
      logger.info(`${name} Server Listening!`);
    });
  }
  onCreate(socket) {}
  onClose() {}
  onRead(socket, data) {
    logger.info(data);
    socket.write(data);
  }
}

module.exports = TcpServer;
