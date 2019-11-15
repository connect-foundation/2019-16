require("dotenv").config();
const Koa = require("koa");
const KoaRouter = require("koa-router");
const koaBody = require("koa-bodyparser");
const { ApolloServer, gql } = require("apollo-server-koa");
const passportForPartners = require("./passport/partners");
const mongoose = require("mongoose");
const authRouter = require("./routes");

const { PORT, PARTNERS_MONGO_URI, PARTNERS_USER, PARTNERS_PASS } = process.env;

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
  type Query {

  }
`;
const resolvers = {
  Query: {},
  Mutation: {
    login: async (_, { email, password }) => {
      let wait, data;
      const packet = await makePacket(
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

      const tcpClient = new TcpClient(
        "127.0.0.1",
        8081,
        () => {},
        payload => {
          wait.next();
          data = payload.body.jwt;
        },
        () => {},
        () => {}
      );

      tcpClient.connect();
      tcpClient.write(packet);

      function* gen(resolve) {
        resolve();
        return;
      }

      await new Promise((resolve, reject) => {
        wait = gen(resolve);
      });

      return {
        jwt: data
      };
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
});
