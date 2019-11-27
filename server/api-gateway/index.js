require("dotenv").config({ path: ".env.gateway" });
const mongoose = require("mongoose");
const App = require("../lib/tcp/App");
const { makeKey } = require("../lib/tcp/util");
const express = require("express");
const server = express();
const authRouter = require("./routes/auth");
const {
  GATE_EXPRESS_PORT,
  GATE_TCP_PORT,
  GATE_NAME,
  PARTNERS_MONGO_URI,
  PARTNERS_USER,
  PARTNERS_PASS,
  GATE_HOST
} = process.env;

mongoose
  .connect(PARTNERS_MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: true
  })
  .then(() => {
    console.log("Partners mongoDB is connected");
  })
  .catch(() => {
    console.log("Partners mongoDB connection fail");
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
const searchRouter = require("./routes/search")(apigateway);

async function setResponseKey(req, res, next) {
  const key = await makeKey(req.client);

  req.resKey = key;
  apigateway.resMap[key] = res;
  next();
}

function writePacket(req, res, next) {
  const appName = req.path.split("/")[2];

  apigateway.appClientMap[appName].write(req.packet);
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
        apigateway.resMap[data.key].json(data.body.studygroups);
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
        console.log(`try connect to search2`);
        client.connect();
      }
    }, 2000);
    return client;
  } catch (e) {
    console.log(e);
  }
    if (req.path !== "/favicon.ico") {
        const key = await makeKey(req.client);

        req.resKey = key;
        apigateway.resMap[key] = res;
    }
    next();
}

function writePacket(req, res, next) {
    try {
        if (req.path !== "/favicon.ico") {
            const appName = req.path.split("/")[2];

            apigateway.appClientMap[appName].write(req.packet);
        }
    } catch (e) {
        let error = new Error('ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRR');

        apigateway.resMap[req.resKey].status(error.status || 500);
        apigateway.resMap[req.resKey].send(error.message || 'ErrorRRRRRRRRRRRRRRRRRRRRRRRRRRRR!!');
        delete apigateway.resMap[req.resKey];
    }
}



let searchRouter = require("./routes/search")(apigateway)

server.use(setResponseKey)

server.get('/', (req, res) => res.send('Hello World!'));

server.use('/api/search', searchRouter);



server.use(writePacket);

server.listen(GATE_EXPRESS_PORT, async () => {
    connectToAllApps();
})

async function makeAppClient(name) {
    try {
        const client = await apigateway.connectToApp(name,
            () => {
                // connect이벤트 함수
                apigateway.appClientMap[name] = client;
                apigateway.icConnectMap[name] = true;
                console.log(`${name} service connect`)
            },
            (data) => {
                // data이벤트 함수
                if (data.method === "REPLY") {
                    apigateway.resMap[data.key].json(data.body.studygroups);
                }
                if (data.method === "ERROR") {
                    let error = new Error('ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRR');

                    apigateway.resMap[data.key].status(error.status || 500);
                    apigateway.resMap[data.key].send(error.message || 'ErrorRRRRRRRRRRRRRRRRRRRRRRRRRRRR!!');
                }
                delete apigateway.resMap[data.key];
            },
            () => {
                apigateway.icConnectMap[name] = false;
                console.log(`${name} service end`)
            },
            () => {
                apigateway.icConnectMap[name] = false;
                console.log(`${name} service error`)
            }
        );

        setInterval(() => {
            if (!apigateway.icConnectMap[name]) {
                console.log(`try connect to search2`);
                client.connect();
            }
        }, 2000);
        return client;
    } catch (e) {
        console.log(e)
    }
}

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

