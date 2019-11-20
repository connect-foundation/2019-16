const TcpServer = require("./TcpServer");
const TcpClient = require("./TcpClient");
const logger = require("../../services/logger/logger");

class App extends TcpServer {
  constructor(name, host, port, query = []) {
    super(name, host, port);
    this.query = query;
    this.isConnectToAppListManager = false;
  }

  connectToAppListManager() {
    this.appListManager = new TcpClient(
      "127.0.0.1",
      8100,
      () => {
        this.isConnectToAppListManager = true;
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
