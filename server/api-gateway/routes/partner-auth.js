const Router = require("koa-router");
const partnersRouter = new Router();
const passportForPartners = require("../passport/partners");

partnersRouter.post("/login",
	passportForPartners.authenticate('local', { // 리액트 라우터에 따라서 변경
		failureRedirect: "/auth/partners/fail"
	}), (ctx, next) => {
		// 파트너 로그인 성공
		// JWT 생성
		// partners 페이지로 리다이렉트
	}
);

module.exports = partnersRouter;
