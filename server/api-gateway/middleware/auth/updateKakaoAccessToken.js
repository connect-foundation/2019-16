const User = require("../../models/user");

function updateKakaoAccessToken(req, res) {
  const { email } = req.params;
  const { kakaoAccessToken } = req.body;

  User.findOneAndUpdate({ email }, { kakaoAccessToken }, err => {
    if (err) res.sendStatus(500);
    return res.sendStatus(200);
  });
}

module.exports = updateKakaoAccessToken;
