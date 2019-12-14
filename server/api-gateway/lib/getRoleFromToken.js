const jwt = require("jsonwebtoken");

module.exports = function(token) {
  try {
    const decoded = jwt.decode(token);
    const unverifiedRole = decoded.role;
    const jwtKey =
      process.env[`JWT_${unverifiedRole.toUpperCase()}_SECRET_KEY`];
    const verified = jwt.verify(token, jwtKey);

    return verified.role;
  } catch (e) {
    throw Error("Unverified Token");
  }
};
