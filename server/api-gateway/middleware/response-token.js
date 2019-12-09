const jwtGenerator = require("../auth/jwt-generator");

// jwt 생성 후 쿠키와 함께 메인 페이지로 리다이렉트
module.exports = (req, res) => {
  let jwt;

  try {
    jwt = jwtGenerator(req.user, req.user.role);
  } catch (e) {
    jwt = "";
  } finally {
    res.cookie("access_token", jwt, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000 // 1일
    });
    res.redirect("http://106.10.41.25:3000");
  }
};
