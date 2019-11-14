const Router = require("koa-router");
const authRouter = new Router();
const partnersRouter = require("./partner-auth");

authRouter.use("/partners", partnersRouter.routes());
// authRouter.use("/users");

module.exports = authRouter;
