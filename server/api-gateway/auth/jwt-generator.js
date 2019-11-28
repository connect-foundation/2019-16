const jwt = require("jsonwebtoken");
const USER_JWT_SECRET = "c6c5be88-e1ac-4e6f-a505-f2ce2740744f";
const PARTNER_JWT_SECRET = "0ff38f01-05be-41e4-9bb5-338835dc6199";

/**
 * @param {Object} payload
 * @param {String} type "user" or "partner"
 */
module.exports = (payload, type) => {
  const data = JSON.stringify(payload);

  if (type === "user") return jwt.sign(data, USER_JWT_SECRET);
  if (type === "partner") return jwt.sign(data, PARTNER_JWT_SECRET);

  throw new Error("JWT Generator Type Error");
};
