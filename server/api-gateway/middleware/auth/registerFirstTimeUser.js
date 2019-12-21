const User = require("../../models/user");
const { jwtGenerator } = require("./util");

async function registerFirstTimeUser(req, res) {
  const data = req.body;
  const { errors } = await User.create(data);

  if (errors) res.sendStatus(500);
  res
    .cookie("access_token", jwtGenerator({ id: data.userId, role: "user" }), {
      httpOnly: false,
      domain: "studycombined.shop",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000 // 1일
    })
    .sendStatus(200);
}

module.exports = registerFirstTimeUser;
