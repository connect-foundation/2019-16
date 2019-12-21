const jwt = require("jsonwebtoken");
const USER_JWT_SECRET = "c6c5be88-e1ac-4e6f-a505-f2ce2740744f";
const PARTNER_JWT_SECRET = "0ff38f01-05be-41e4-9bb5-338835dc6199";

function jwtGenerator(payload) {
  const data = JSON.stringify(payload);
  const { role } = payload;

  if (role === "user") return jwt.sign(data, USER_JWT_SECRET);
  if (role === "partner") return jwt.sign(data, PARTNER_JWT_SECRET);

  throw new Error("JWT Generator Type Error");
}

module.exports = {
  jwtGenerator
};
