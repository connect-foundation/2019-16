const User = require("../../models/user");

module.exports = function(req, res, next) {
  const { email } = req.params;

  User.findOne({ email }, (err, user) => {
    if (user === null) return res.json(user);

    return res.json({
      userGender: user.gender || null,
      userAgeRange: user.ageRange || null,
      userLocation: user.location || { lat: null, lon: null }
    });
  });
};
