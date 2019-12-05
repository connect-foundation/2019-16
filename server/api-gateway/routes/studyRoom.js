const express = require("express");
const router = express.Router();
const { makePacket } = require("../../lib/tcp/util");

module.exports = function(apigateway) {
  router.get("/", (req, res) => {
    res.end("Hello");
  });
  return router;
};
