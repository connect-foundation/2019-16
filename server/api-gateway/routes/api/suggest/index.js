const express = require("express");
const router = express.Router();

const { makePacket } = require("../../../../lib/tcp/util");

module.exports = function(apiGateway) {
  router.post("/suggestQueries", (req, res, next) => {
    const { searchWord } = req.params;

    req.packet = makePacket(
      "GET",
      "apigateway",
      "suggestQueries",
      "suggestQueries",
      { searchWord },
      {},
      req.resKey,
      apiGateway.context
    );

    next();
  });
  return router;
};
