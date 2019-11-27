const jwtGenerator = require("../auth/jwt-generator");

// jwt 생성 후 쿠키와 함께 메인 페이지로 리다이렉트
module.exports = (req, res) => {
  let jwt;

  try {
    jwt = jwtGenerator(req.user, "user");
  } catch (e) {
    jwt = "";
  } finally {
    res.cookie("access_toekn", jwt, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1일
    });
    res.redirect("/");
  }
};
