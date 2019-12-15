const User = require("../../models/user");

function registerFirstTimeUser(req, res) {
  const data = req.body;

  User.create(data, err => {
    if (err) return res.sendStatus(500);
    return res.sendStatus(200);
  });
}

module.exports = registerFirstTimeUser;
