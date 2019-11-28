require("dotenv").config({ path: ".env.gateway" });
const path = require("path");
const mongoose = require("mongoose");
const App = require("../lib/tcp/App");
const { makeKey } = require("../lib/tcp/util");
const cors = require("cors");
const express = require("express");
const server = express();

require("./auth/passport")(server); // passport config
const favicon = require("express-favicon");
const authRouter = require("./routes/auth");
const studyGroupRouter = require("./routes/studyGroup");

const {
  GATE_EXPRESS_PORT,
  GATE_TCP_PORT,
  GATE_NAME,
  ACCOUNTS_MONGO_URI,
  GATE_HOST
} = process.env;

mongoose
  .connect(ACCOUNTS_MONGO_URI, {
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
    super(GATE_NAME, GATE_HOST, GATE_TCP_PORT);
    this.appClientMap = {};
    this.icConnectMap = {};
    this.resMap = {};
  }
}

const apigateway = new ApiGateway();
const gatewayLogger = require("./middleware/middleware-logger")(apigateway);

async function setResponseKey(req, res, next) {
  const key = await makeKey(req.client);

  req.resKey = key;
  apigateway.resMap[key] = res;
  next();
}

function writePacket(req, res, next) {
  try {
    if (req.path !== "/favicon.ico") {
      const appName = req.path.split("/")[2];

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

const searchRouter = require("./routes/search")(apigateway);

server.use(express.json());
server.use(cors());

server.use(favicon(path.join(__dirname, "/favicon.ico")));
server.use(setResponseKey);

server.get("/", gatewayLogger, (req, res) => res.send("Hello World!"));

server.use("/api/search", gatewayLogger, searchRouter);
server.use("/api/studyGroup", studyGroupRouter);
server.use("/auth", authRouter);
server.use(writePacket);

/**
 * 연결 가능한 모든 서비스들에 대한 tcp 클라이언트 생성
 */
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
        apigateway.icConnectMap[name] = true;
        console.log(`${name} service connect`);
      },
      data => {
        // data이벤트 함수
        if (data.method === "REPLY") {
          apigateway.resMap[data.key].json(data.body.studygroups);
        }
        if (data.method === "ERROR") {
          let error = new Error("서비스에서 에러가 발생했습니다.");

          apigateway.resMap[data.key].status(error.status || 500);
          apigateway.resMap[data.key].send(
            error.message || "서비스에서 에러가 발생했습니다."
          );
        }
        delete apigateway.resMap[data.key];
      },
      () => {
        apigateway.icConnectMap[name] = false;
        console.log(`${name} service end`);
      },
      () => {
        apigateway.icConnectMap[name] = false;
        console.log(`${name} service error`);
      }
    );

    setInterval(() => {
      if (!apigateway.icConnectMap[name]) {
        console.log(`try connect to ${name}`);

        client.connect();
      }
    }, 2000);
    return client;
  } catch (e) {
    console.log(e);
  }
}

server.listen(GATE_EXPRESS_PORT, async () => {
  connectToAllApps();
});
