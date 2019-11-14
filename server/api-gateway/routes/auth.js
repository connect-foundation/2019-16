const Router = require("koa-router");
const authRouter = new Router();
const partnersRouter = require("./auth.partners");
const usersRouter = require("./auth.users");

authRouter.use("/partners", partnersRouter.routes());
authRouter.use("/users", usersRouter.routes());

module.exports = authRouter;
