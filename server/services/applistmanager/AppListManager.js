const TcpServer = require("../../lib/tcp/tcpServer");
const { makePacket, makeKey } = require("../../lib/tcp/util");
const logger = require("../logger/logger");
const { setAppbypName, deletebypName, updatdAppbypName, getAppbypName, getAllApps } = require("../../lib/redis")

let appManagerInstance;

class AppListManager extends TcpServer {
  constructor(name, host, port, query = []) {
    if (appManagerInstance) return appManagerInstance;
    super(name, host, port);
    this.query = query;
    appManagerInstance = this;
  }
  send(socket, packet) {
    socket.write(packet);
  }
  async onCreate(socket) {
    logger.info(`create App: ${socket.remoteAddress} : ${socket.remotePort}`);
  }
  async onClose(socket) {
    const key = await makeKey(socket)

    try {
      await deletebypName(key);
    } catch (e) {
      console.log(e)
    }

  }

  async onRead(socket, data) {

    const { method, query, info } = data;
    const key = makeKey(socket);
    let result;

    try {
      if (method === "POST") {
        switch (query) {
          case "add":
            result = await setAppbypName(key, info);
            break;
          case "delete":
            result = await deletebypName(key, info);
            break;
          case "update":
            result = await updatdAppbypName(key, info);
            break;
          default:
            break;
        }
      }
      if (method === "GET") {
        switch (query) {
          case "get":
            result = await getAppbypName(key);
            break;
          case "getAll":
            result = await getAllApps();
            break;
          default:
            break;
        }
        const packet = makePacket("REPLY", "apps", {}, { apps: result }, this.context);

        this.send(socket, packet)
      }
    }
    catch (e) {
      console.log(e);
    }
  }

}

module.exports = AppListManager;
