const User = require("../../models/user");

async function updateKakaoAccessToken(req, res) {
  const { userId } = req.params;
  const { kakaoAccessToken } = req.body;

  await User.findOneAndUpdate({ userId }, { $set: { kakaoAccessToken } });
  res.end();
}

module.exports = updateKakaoAccessToken;
