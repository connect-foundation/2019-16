require("dotenv").config();
const Koa = require("koa");
const KoaRouter = require("koa-router");
const koaBody = require("koa-bodyparser");
const { ApolloServer, gql } = require("apollo-server-koa");
const passportForPartners = require("./passport/partners");
const mongoose = require("mongoose");
const authRouter = require("./routes");
const TcpClient = require("../lib/tcp/tcpClient");
const TcpServer = require("../lib/tcp/tcpServer");
const { makeKey, makePacket, PACKET_SPLITTER } = require("../lib/tcp/util");

const { PORT, PARTNERS_MONGO_URI, PARTNERS_USER, PARTNERS_PASS } = process.env;

// const tcpClient = new TcpClient(
//   "127.0.0.1",
//   8080,
//   () => {},
//   data => {
//     return data;
//   },
//   () => {},
//   () => {}
// );

const mongoOptions = {
  dbName: "partners",
  user: PARTNERS_USER,
  pass: PARTNERS_PASS,
  useNewUrlParser: true,
  useFindAndModify: true
};

mongoose
  .connect(PARTNERS_MONGO_URI, mongoOptions)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(e => {
    console.error(e);
  });

const typeDefs = gql`
  type JwtResponse {
    jwt: String
  }

  type Query {
    hello: String
  }

  type Mutation {
    login(email: String, password: String): JwtResponse
  }
`;

const resolvers = {
  Query: {
    hello: () => "hello world"
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const packet = makePacket(
        "POST",
        "login",
        { email, password },
        {},
        {
          name: "gateway",
          host: "127.0.0.1",
          port: 8000,
          query: ""
        }
      );
      let data;
      const tcpClient = new TcpClient(
        "127.0.0.1",
        8080,
        () => {},
        (payload) => {
          
          console.log(data)
          return data;
        },
        () => {},
        () => {}
      );

      tcpClient.connect();
      tcpClient.write(packet);
      
    }
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

app.listen(8000 || PORT, () => {
  console.log("8000번에서 API Gateway 실행중...");

  const distributor = new TcpServer("gateway", "127.0.0.1", 8000, "");

  distributor.connectToDistributor();
});
