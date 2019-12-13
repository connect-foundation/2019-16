const getRoleFromToken = require("../../lib/getRoleFromToken");

module.exports = function(req, res, next) {
  try {
    const jwt = req.cookies.access_token;
    const role = getRoleFromToken(jwt);

    req.role = role;
    next();
  } catch (e) {
    console.error(e);
    res.redirect("http://studycombined.shop/unauthorized");
  }
};
