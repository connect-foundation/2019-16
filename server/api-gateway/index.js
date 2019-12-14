const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "/../.env") });
const {
  GATEWAY_EXPRESS_PORT,
  GATEWAY_TCP_PORT,
  GATEWAY_NAME,
  ACCOUNTS_MONGO_URL,
  GATEWAY_HOST,
  HTTPS_PRIVKEY_PATH,
  HTTPS_CERTKEY_PATH
} = process.env;
const mongoose = require("mongoose");
const favicon = require("express-favicon");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const App = require("../lib/tcp/App");
const { makeKey } = require("../lib/tcp/util");
const fs = require("fs");
const https = require("https");
const options = {
  key: fs.readFileSync(path.join(__dirname, `/../keys/${HTTPS_PRIVKEY_PATH}`)),
  cert: fs.readFileSync(path.join(__dirname, `/../keys/${HTTPS_CERTKEY_PATH}`))
};
const server = express();
const { makeLogSender } = require("../lib/tcp/logUtils");

mongoose
  .connect(ACCOUNTS_MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Accounts mongoDB is connected");
  })
  .catch(() => {
    console.log("Accounts mongoDB connection fail");
  });

class ApiGateway extends App {
  constructor() {
    super(GATEWAY_NAME, GATEWAY_HOST, GATEWAY_TCP_PORT);
    this.appClientMap = {};
    this.isConnectMap = {};
    this.resMap = {};
    this.httpLogSender = makeLogSender.call(this, "http");
  }
  onRead(socket, data) {
    // data이벤트 함수
    if (data.method === "REPLY") {
      this.resMap[data.key].json(data.body);
    }
    if (data.method === "ERROR") {
      let error = new Error("서비스에서 에러가 발생했습니다.");

      this.resMap[data.key].status(error.status || 500);
      this.resMap[data.key].send(
        error.message || "서비스에서 에러가 발생했습니다."
      );
    }
    delete this.resMap[data.key];
  }
}

const apigateway = new ApiGateway();

const authRouter = require("./routes/auth");
const gatewayLogger = require("./middleware/middleware-logger")(apigateway);
const searchRouter = require("./routes/search")(apigateway);
const studyGroupRouter = require("./routes/api/studyGroup")(apigateway);
const studyRoomRouter = require("./routes/api/studyroom")(apigateway);
const apiRouter = require("./routes/api");

apigateway.connectToLogService();


server.use(cookieParser());
server.use(express.json());
server.use(cors());

server.use(favicon(path.join(__dirname, "/favicon.ico")));
server.use(setResponseKey);

server.use(gatewayLogger);

server.use(require("./middleware/auth/token-parser"));
server.use("/auth", authRouter);
server.use("/api/search", searchRouter);
server.use("/api/studygroup", studyGroupRouter);
server.use("/api/studyroom", studyRoomRouter);
server.use("/api", apiRouter);
server.use("/api", writePacket);

server.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

https.createServer(options, server).listen(GATEWAY_EXPRESS_PORT, async () => {
  connectToAllApps();
});

/**
 * 연결 가능한 모든 서비스들에 대한 tcp 클라이언트 생성
 */
async function setResponseKey(req, res, next) {
  const key = await makeKey(req.client);

  req.resKey = key;
  apigateway.resMap[key] = res;
  next();
}

function writePacket(req, res, next) {
  try {
    if (req.path !== "/favicon.ico") {
      const appName = req.path.split("/")[1];

      apigateway.appClientMap[appName].write(req.packet);
    }
  } catch (e) {
    let error = new Error("잘못된 라우터로 요청이 들어왔습니다. ");

    apigateway.resMap[req.resKey].status(error.status || 500);
    apigateway.resMap[req.resKey].send(
      error.message || "잘못된 라우터로 요청이 들어왔습니다."
    );
    delete apigateway.resMap[req.resKey];
  }
}

async function connectToAllApps() {
  const apps = await apigateway.getAllApps();

  const appNames = apps.map(app => app.name);

  appNames.forEach(appName => {
    makeAppClient(appName);
  });
}

async function makeAppClient(name) {
  try {
    const client = await apigateway.connectToApp(
      name,
      () => {
        // connect이벤트 함수
        apigateway.appClientMap[name] = client;
        apigateway.isConnectMap[name] = true;
        console.log(`${name} service connect`);
      },
      () => { },
      () => {
        apigateway.isConnectMap[name] = false;
        console.log(`${name} service end`);
      },
      () => {
        apigateway.isConnectMap[name] = false;
        console.log(`${name} service error`);
      }
    );

    setInterval(() => {
      if (!apigateway.isConnectMap[name]) {
        console.log(`try connect to ${name}`);

        client.connect();
      }
    }, 2000);
    return client;
  } catch (e) {
    console.log(e);
  }
}
