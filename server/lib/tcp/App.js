const TcpServer = require("./tcpServer");
const TcpClient = require("./tcpClient");
const logger = require("../../services/logger/logger");
const { makePacket } = require("../tcp/util");
const { getAppbyName } = require("../redis");

class App extends TcpServer {
  constructor(name, host, port, query = []) {
    super(name, host, port);
    this.query = query;
    this.isConnectToAppListManager = false;
    this.appClients = {};
  }

  async connectToApp(name, onCreate, onRead, onEnd, onError) {
    const clientInfo = await getAppbyName(name);
    const client = new TcpClient(clientInfo.host, clientInfo.port, onCreate, onRead, onEnd, onError);

    this.appClients[name] = client;
  }

  connectToAppListManager() {
    this.appListManager = new TcpClient(
      "127.0.0.1",
      8100,
      () => {
        this.isConnectToAppListManager = true;
        const packet = makePacket("POST", "add", {}, {}, this.context);

        this.appListManager.write(packet)
        logger.info(
          `${this.context.host}:${this.context.port} is connected to app list manager`
        );
      },
      () => {
        logger.info(`It is read function at Port:${this.context.port}`);
      },
      () => {
        logger.warn(`end service`);
        this.isConnectToAppListManager = false;
      },
      () => {
        logger.warn(`App list manager server is down`);
        this.isConnectToAppListManager = false;
      }
    );

    setInterval(() => {
      if (!this.isConnectToAppListManager) {
        logger.info(`try connect to app list manager`);
        this.appListManager.connect();
      }
    }, 3600);
    return this.appListManager;
  }
}

module.exports = App;
