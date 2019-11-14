const Router = require("koa-router");
const usersRouter = new Router();
const passport = require("../auth/passport");

usersRouter.post("/login", async (ctx, next) => {
  return passport.authenticate("kakao", (err, user, info, status) => {
    if (err) ctx.body = { msg: "시스템 에러" };
    if (!user) ctx.body = { msg: info.message };

    // jwt 토큰 생성
    // 쿠키 설정 후 성공 메세지 전송
    ctx.body = { msg: "로그인 성공", user: user };
  })(ctx);
});

module.exports = usersRouter;
