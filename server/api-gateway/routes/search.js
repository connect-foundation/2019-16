const express = require("express");
const router = express.Router();

const { makePacket } = require("../../lib/tcp/util");

module.exports = function(apigateway) {
  router.get("/query/:searchWord", async (req, res, next) => {
    const searchWord = req.params.searchWord;

    const packet = makePacket(
      "POST",
      "searchStudyGroup",
      { searchWord, isRecruit: true },
      {},
      req.resKey,
      apigateway.context
    );

    req.packet = packet;
    next();
  });

  router.get("/all", async (req, res, next) => {
    const packet = makePacket(
      "POST",
      "searchAllStudyGroupWithFiltering",
      { isRecruit: true },
      {},
      req.resKey,
      apigateway.context
    );

    req.packet = packet;
    next();
  });
  return router;
};
