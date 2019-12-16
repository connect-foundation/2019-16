const User = require("../../models/user");

module.exports = async function(req, res) {
  const { userId } = req.params;
  const result = await User.findOne({ userId });

  if (result === null) res.json(null);

  const {
    userEmail,
    userGender,
    userAgeRange,
    userName,
    kakaoAccessToken,
    profileImage,
    userLocation
  } = result;

  res.json({
    userId,
    userEmail,
    userGender,
    userAgeRange,
    userName,
    kakaoAccessToken,
    profileImage,
    userLocation
  });
};
