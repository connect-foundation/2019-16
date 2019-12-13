const User = require("../../models/user");

module.exports = function(req, res) {
  const { email } = req.params;

  User.findOne({ email }, (err, user) => {
    if (err) return res.sendStatus(500);
    if (user === null) return res.json(user);

    return res.json({
      userEmail: user.email,
      userName: user.name,
      profileImage: user.profileImage,
      userGender: user.gender,
      userAgeRange: user.ageRange,
      userLocation: user.location
    });
  });
};
