const User = require("../../models/user");

module.exports = function(req, res) {
  const { userId } = req.params;

  User.findOne(
    { userId },
    { _id: false, history: false, ownGroups: false, partipatedGroups: false },
    (err, user) => {
      if (err) return res.sendStatus(500);
      if (user === null) return res.json(user);

      return res.json(user);
    }
  );
};
