require("dotenv").config();
const Koa = require("koa");
const KoaRouter = require("koa-router");
const koaBody = require("koa-bodyparser");
const { ApolloServer, gql } = require("apollo-server-koa");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;
const resolvers = {
	Query: {
		hello: () => "hello world"
	}
};
const server = new ApolloServer({ typeDefs, resolvers });
const app = new Koa();
const router = new KoaRouter();

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());
server.applyMiddleware({ app });

app.listen(8000 || PORT, () => {
  console.log("8000번에서 API Gateway 실행중...");
});
