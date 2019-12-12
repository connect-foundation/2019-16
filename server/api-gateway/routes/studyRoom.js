const express = require("express");
const router = express.Router();
const { makePacket } = require("../../lib/tcp/util");

module.exports = function(apigateway) {
  router.get("/availableRooms", (req, res, next) => {
    const studyGroupData = req.body;

    req.packet = makePacket(
      "GET",
      "availableRooms",
      "filterStudyGroup",
      { ...studyGroupData },
      {},
      req.resKey,
      apigateway.context
    );

    next();
  });
  return router;
};
