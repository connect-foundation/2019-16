const TcpServer = require("./tcpServer");
const TcpClient = require("./tcpClient");
const { makePacket, isLogService, isErrorPacket } = require("../tcp/util");
const { getAppbyName, getAllApps, popMessageQueue } = require("../redis");
const { makeLogSender } = require("./logUtils");

class App extends TcpServer {
  constructor(name, host, port, job) {
    super(name, host, port);
    this.job = job;
    this.isConnectToAppListManager = false;
    this.isConnectedToLogService = false;
    this.isConnectToApiGateway = false;
    this.appClients = {};
    this.ApiGateway = this.connectToApiGateway();

    this.sendTcpLog = makeLogSender.call(this, "tcp");
    (async () => {
      if (isLogService(name)) return;
      await new Promise(res => this.connectToLogService(res));
      this.doMessageJob();
    })();
  }

  async doMessageJob() {
    const packets = await popMessageQueue(this.context.name, 1000);

    if (!Array.isArray(packets)) {
      this.job({}, JSON.parse(packets));
    } else {
      packets.forEach(packet => {
        this.job({}, JSON.parse(packet));
      });
    }
  }

  async onRead(socket, data) {
    if (!isLogService(this.context.name) && data.hasOwnProperty("nextQuery")) {
      const spanId = await this.sendTcpLog(data.nextQuery);

      data.spanId = spanId;
    }

    this.job(socket, data);
  }

  async send(appClient, data) {
    const packet = makePacket(
      data.method,
      data.curQuery,
      data.nextQuery,
      data.endQuery,
      data.params,
      data.body,
      data.key,
      data.info
    );

    if (data.curQuery === data.endQuery) {
      this.ApiGateway.write(packet);
    } else {
      appClient.write(packet);
    }
    if (!isLogService(data.info.name) && data.spanId) {
      if (isErrorPacket(data.method)) {
        await this.sendTcpLog(data.curQuery, {
          spanId: data.spanId,
          errors: data.method,
          errorMsg: data.body.msg
        });
        return;
      }
      await this.sendTcpLog(data.curQuery, { spanId: data.spanId });
    }
  }

  async connectToApp(name, onCreate, onRead, onEnd, onError) {
    if (this.appClients[name] !== undefined) return this.appClients[name];

    try {
      const clientInfo = await getAppbyName(name);

      if (clientInfo === null) throw new Error(`${name} server is not running`);

      const client = new TcpClient(
        name,
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
      throw new Error(e);
    }
  }

  async getAllApps() {
    try {
      const apps = await getAllApps();

      return apps;
    } catch (e) {
      throw new Error(e);
    }
  }

  connectToAppListManager() {
    this.appListManager = new TcpClient(
      "appListManager",
      "127.0.0.1",
      8100,
      () => {
        this.isConnectToAppListManager = true;
        const packet = makePacket(
          "POST",
          this.name,
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

  connectToLogService(res) {
    this.logService = new TcpClient(
      "logService",
      "127.0.0.1",
      8004,
      () => {
        console.log(
          `${this.context.host}:${this.context.port} is connected to logService`
        );
        this.isConnectedToLogService = true;
        if (res) res();
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
      "apiGateway",
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
