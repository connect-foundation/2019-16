const net = require("net");
const TcpClient = require("./tcpClient");
const logger = require("../../services/logger/logger");
const { makeKey, makePacket, PACKET_SPLITTER } = require("./util");

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
          if (packet === "") {
            return;
          }
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

  connectToDistributor() {
    this.distributor = new TcpClient(
      "127.0.0.1",
      8100,
      () => {
        // this.isConnectToDistributor = true;
        logger.info(
          `${this.context.host}:${this.context.port} is connected to Distributor`
        );
        // const packet = makePacket("POST", "distribute",{},{}, this.context);

        // this.distributor.write(packet)
      },
      () => {
        logger.info(`It is read function at Port:${this.context.port}`);
      },
      () => {
        logger.warn(`end service`);
        this.isConnectToDistributor = false;
      },
      () => {
        logger.warn(`distributor server is down`);
        this.isConnectToDistributor = false;
      }
    );

    setInterval(() => {
      if (!this.isConnectToDistributor) {
        this.isConnectToDistributor = true;
        logger.info(`try connect to distributor`);
        this.distributor.connect();
      }
    }, 3600);
    return this.distributor;
  }
}

module.exports = TcpServer;
