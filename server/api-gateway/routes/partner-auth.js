const Router = require("koa-router");
const partnersRouter = new Router();
const passportForPartners = require("../passport/partners");

partnersRouter.post(
  "/login",
  async (ctx, next) => {
    return passportForPartners.authenticate(
      "local",
      (err, user, info, status) => {
        if (err) ctx.body = { msg: "시스템 에러" };
        if (!user) ctx.body = { msg: info.message };

        // jwt 토큰 생성
        // 파트너 페이지로 redirection
        next();
      }
    )(ctx);
  },
  ctx => {
    debugger;
  }
);

module.exports = partnersRouter;
