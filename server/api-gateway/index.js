require("dotenv").config({ path: ".env.gateway" });
const Koa = require("koa");
const KoaRouter = require("koa-router");
const koaBody = require("koa-bodyparser");
const { ApolloServer, gql } = require("apollo-server-koa");
const passportForPartners = require("./passport/partners");
const mongoose = require("mongoose");
const authRouter = require("./routes");
const TcpClient = require("../lib/tcp/tcpClient");
const TcpServer = require("../lib/tcp/tcpServer");
const { makePacket } = require("../lib/tcp/util");

const {
  GATE_PORT,
  PARTNERS_MONGO_URI,
  PARTNERS_USER,
  PARTNERS_PASS,
  GATE_HOST
} = process.env;

console.log(GATE_PORT);
const mongoOptions = {
  dbName: "partners",
  user: PARTNERS_USER,
  pass: PARTNERS_PASS,
  useNewUrlParser: true,
  useFindAndModify: true
};

const nodeInfo = {};

mongoose
  .connect(PARTNERS_MONGO_URI, mongoOptions)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(e => {
    console.error(e);
  });

function readyToSend(client, packet) {
  return (function*() {
    const resolve = yield;

    client.write(packet);
    const data = yield;

    resolve(data);
  })();
}

async function fetchData(packetGenerator) {
  const data = await new Promise(resolve => {
    packetGenerator.next();
    packetGenerator.next(resolve);
  });

  return data;
}

// packetInfo: { method, query, body }
// packet의 params는 포함되지 않으며 2줄 아래에 있는 인자를 따로 넣어줘야함
function resolverLogic(serviceName, packetInfo) {
  return async function(_, params) {
    let tcpClient = nodeInfo[serviceName].socket;

    if (!tcpClient) {
      const { serviceHost, servicePort } = nodeInfo[serviceName];

      tcpClient = new TcpClient(
        serviceHost,
        servicePort,
        () => {},
        payload => {
          packetGenerator.next(payload.body);
        },
        () => {},
        () => {}
      );

      tcpClient.connect();
    }

    const { method, query, body = {} } = packetInfo;
    const packet = await makePacket(
      method, // POST
      query, // login
      params,
      body,
      {
        name: "gateway",
        host: GATE_HOST,
        port: GATE_PORT
      }
    );

    var packetGenerator = readyToSend(tcpClient, packet);
    const data = fetchData(packetGenerator);

    return data;
  };
}

const typeDefs = gql`
  type Query {

  }

  type Mutation {

  }
`;

const resolvers = {
  Query: {},
  Mutation: {
    login: resolverLogic("login", { method: "POST", query: "login" })
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = new Koa();
const router = new KoaRouter();

router.use("/auth", authRouter.routes());

app.use(passportForPartners.initialize());
app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());
server.applyMiddleware({ app });

app.listen(8000 || GATE_PORT, () => {
  console.log("8000번에서 API Gateway 실행중...");

  const distributor = new TcpServer("gateway", "127.0.0.1", 8000, "");

  distributor.connectToDistributor();
});
