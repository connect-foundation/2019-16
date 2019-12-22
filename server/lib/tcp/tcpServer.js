const net = require("net");
const { makeKey, PACKET_SPLITTER } = require("./util");

class TcpServer {
  constructor(name, host, port) {
    this.context = {
      name,
      host,
      port
    };

    this.dataMap = {};
    this.server = net.createServer(socket => {
      this.onCreate(socket);

      socket.on("close", () => {
        this.onClose(socket);
      });
      socket.on("error", () => {
        this.onError(socket);
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
          try {
            this.onRead(socket, JSON.parse(packet));
          } catch (e) {
            console.log(`PACKET PARSE ERROR\nkey: ${key}\n\n err: ${e}`);
          } finally {
            delete this.dataMap[key];
          }
        });
      });
    });
    this.server.listen(port, host, () => {
      console.log(`${name} Server Listening!`);
    });
  }
  onError(socket) {}
  onCreate(socket) {}
  onClose(socket) {}
  onRead(socket, data) {
    console.log(data);

    socket.write(data);
  }
}

module.exports = TcpServer;
