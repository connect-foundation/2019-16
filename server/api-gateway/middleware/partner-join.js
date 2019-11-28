const Partner = require("../models/partner");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (req, res) => {
  const { name, email, password, cid } = req.body;

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    Partner.create(
      {
        name: name,
        email: email,
        password: hash,
        cid: cid
      },
      mongoError => {
        if (mongoError) return res.json({ join: "fail" });
        else return res.json({ join: "success" });
      }
    );
  });
};
