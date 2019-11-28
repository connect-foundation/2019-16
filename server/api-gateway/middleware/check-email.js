const Partner = require("../models/partner");

module.exports = (req, res) => {
  const { email } = req.body;

  Partner.findOne({ email: email }, (err, overlap) => {
    return res.json({ emailWarning: !!overlap });
  });
};
