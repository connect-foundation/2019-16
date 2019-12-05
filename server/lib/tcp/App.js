const TcpServer = require("./tcpServer");
const TcpClient = require("./tcpClient");
const { makePacket } = require("../tcp/util");
const { getAppbyName, getAllApps } = require("../redis");
const { makeLogSender } = require("./logUtils");

class App extends TcpServer {
  constructor(name, host, port, query = []) {
    super(name, host, port);
    this.query = query;
    this.isConnectToAppListManager = false;
    this.isConnectedToLogService = false;
    this.isConnectToApiGateway = false;
    this.appClients = {};
    this.ApiGateway = this.connectToApiGateway();

    this.tcpLogSender = makeLogSender.call(this, "tcp");
  }

  send(socket, data) {
    const packet = makePacket(
      data.method,
      data.curQuery,
      data.endQuery,
      data.params,
      data.body,
      data.key,
      data.info
    );

    /**
     * params
     * @param {string} query : 서비스의 쿼리
     * @param {object} parentData : 해당 서비스를 호출한 서비스 정보
     */
    this.tcpLogSender = makeLogSender.call(this, "tcp");

    if (data.curQuery === data.endQuery) {
      this.ApiGateway.write(packet);
    } else {
      socket.write(packet);
    }
  }

  async connectToApp(name, onCreate, onRead, onEnd, onError) {
    if (this.appClients[name] !== undefined) return this.appClients[name];

    try {
      const clientInfo = await getAppbyName(name);

      if (clientInfo === null) throw new Error(`${name} server is not running`);

      const client = new TcpClient(
        clientInfo.host,
        clientInfo.port,
        onCreate,
        onRead,
        onEnd,
        onError
      );

      this.appClients[name] = client;
      return client;
    } catch (e) {
      return e;
    }
  }

  async getAllApps() {
    try {
      const apps = await getAllApps();

      return apps;
    } catch (e) {
      return e;
    }
  }

  connectToAppListManager() {
    this.appListManager = new TcpClient(
      "127.0.0.1",
      8100,
      () => {
        this.isConnectToAppListManager = true;
        const packet = makePacket(
          "POST",
          "add",
          "add",
          {},
          {},
          "",
          this.context
        );

        this.appListManager.write(packet);
        console.log(
          `${this.context.host}:${this.context.port} is connected to app list manager`
        );
      },
      () => {
        console.log(`It is read function at Port:${this.context.port}`);
      },
      () => {
        console.log(`end service`);
        this.isConnectToAppListManager = false;
      },
      () => {
        console.log(`App list manager server is down`);
        this.isConnectToAppListManager = false;
      }
    );

    setInterval(() => {
      if (!this.isConnectToAppListManager) {
        console.log(`try connect to app list manager`);
        this.appListManager.connect();
      }
    }, 1000);
    return this.appListManager;
  }

  connectToLogService() {
    this.logService = new TcpClient(
      "127.0.0.1",
      8004,
      () => {
        console.log(
          `${this.context.host}:${this.context.port} is connected to logService`
        );
        this.isConnectedToLogService = true;
      },
      () => {
        console.log(`It is read function at Port:${this.context.port}`);
      },
      () => {
        console.log(`end logService`);
        this.isConnectedToLogService = false;
      },
      () => {
        console.log(`logService is down`);
        this.isConnectedToLogService = false;
      }
    );

    setInterval(() => {
      if (!this.isConnectedToLogService) {
        console.log(`try connect to LogService`);
        this.logService.connect();
      }
    }, 1000);
    return this.logService;
  }

  connectToApiGateway() {
    this.ApiGateway = new TcpClient(
      "127.0.0.1",
      8001,
      () => {
        this.isConnectToApiGateway = true;
        console.log(
          `${this.context.host}:${this.context.port} is connected to ApiGateway`
        );
      },
      () => {
        console.log(`It is read function at Port:${this.context.port}`);
      },
      () => {
        console.log(`end ApiGateway`);
        this.isConnectToApiGateway = false;
      },
      () => {
        console.log(`ApiGateway server is down`);
        this.isConnectToApiGateway = false;
      }
    );

    setInterval(() => {
      if (!this.isConnectToApiGateway) {
        console.log(`try connect to ApiGateway`);
        this.ApiGateway.connect();
      }
    }, 1000);
    return this.ApiGateway;
  }
}

module.exports = App;
