const Partner = require("../models/partner");
const bcrypt = require("bcrypt");

module.exports = (req, res, next) => {
  const { email, password } = req.body;

  Partner.findOne({ email: email }, (err, partner) => {
    if (!partner) return res.json({ login: "fail" });
    bcrypt.compare(password, partner.password, (_err, success) => {
      if (success)
        req.user = {
          email: partner.email,
          name: partner.name,
          role: "partner"
        };
      return next();
    });
  });
};
