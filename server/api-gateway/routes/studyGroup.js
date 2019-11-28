const express = require("express");
const router = express.Router();

const { makePacket } = require("../../lib/tcp/util");

module.exports = function(apigateway) {
  router.get("/", (req, res) => {
    res.send("Hello");
  });

  router.post("/register", async (req, res, next) => {
    const payload = req.body;

    const packet = await makePacket(
      "POST",
      "addGroup",
      { payload },
      {},
      req.resKey,
      apigateway.context
    );

    req.packet = packet;
    next();
  });

  return router;
};
