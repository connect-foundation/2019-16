const getRoleFromToken = require("../../lib/getRoleFromToken");

module.exports = function(req, res, next) {
  try {
    const jwt = req.cookies.access_token;
    const role = getRoleFromToken(jwt);

    req.role = role;
  } finally {
    next();
  }
};
