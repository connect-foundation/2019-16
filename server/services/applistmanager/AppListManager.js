const TcpServer = require("../../lib/tcp/tcpServer");
const { makePacket, makeKey } = require("../../lib/tcp/util");
const {
  setAppbyKey,
  deletebyKey,
  updateAppbyKey,
  getAppbyKey,
  getAllApps
} = require("../../lib/redis");

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
    console.log(`create App: ${socket.remoteAddress} : ${socket.remotePort}`);
  }
  async onClose(socket) {
    const key = await makeKey(socket);

    try {
      await deletebyKey(key);
    } catch (e) {
      console.log(e);
    }
  }
  async onError(socket) {
    const key = await makeKey(socket);

    try {
      await deletebyKey(key);
    } catch (e) {
      console.log(e);
    }
  }
  async onRead(socket, data) {
    const { method, nextQuery, info } = data;
    const key = await makeKey(socket);
    let result;

    try {
      if (method === "POST") {
        switch (nextQuery) {
          case "add":
            result = await setAppbyKey(key, info);
            break;
          case "delete":
            result = await deletebyKey(key, info);
            break;
          case "update":
            result = await updateAppbyKey(key, info);
            break;
          default:
            break;
        }
      }
      if (method === "GET") {
        switch (nextQuery) {
          case "get":
            result = await getAppbyKey(key);
            break;
          case "getAll":
            result = await getAllApps();
            break;
          default:
            break;
        }
        const packet = makePacket(
          "REPLY",
          "apps",
          "apps",
          "apps",
          {},
          { apps: result },
          "",
          this.context
        );

        this.send(socket, packet);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = AppListManager;
