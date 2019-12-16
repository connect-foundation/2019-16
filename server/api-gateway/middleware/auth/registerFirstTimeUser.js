const User = require("../../models/user");

async function registerFirstTimeUser(req, res) {
  const data = req.body;
  const { errors } = await User.create(data);

  if (errors) res.sendStatus(500);
  res.sendStatus(200);
}

module.exports = registerFirstTimeUser;
