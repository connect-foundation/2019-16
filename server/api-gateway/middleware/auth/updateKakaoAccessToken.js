const User = require("../../models/user");

async function updateKakaoAccessToken(req, res) {
  const { userId } = req.params;
  const { kakaoAccessToken } = req.body;
  const updateResult = await User.findOneAndUpdate(
    { userId },
    { $set: { kakaoAccessToken } }
  );

  res.sendStatus(200);
}

module.exports = updateKakaoAccessToken;
