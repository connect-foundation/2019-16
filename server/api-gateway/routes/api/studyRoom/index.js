const express = require("express");
const router = express.Router();

const { makePacket } = require("../../../../lib/tcp/util");

module.exports = function(apiGateway) {
  router.post("/availableRooms", (req, res, next) => {
    const studyGroupData = req.body;

    req.packet = makePacket(
      "GET",
      "apigateway",
      "availableRooms",
      "filterStudyGroup",
      { ...studyGroupData },
      {},
      req.resKey,
      apiGateway.context
    );

    next();
  });

  router.get("/:id", (req, res, next) => {
    const studyRoomId = req.params.id;

    req.packet = makePacket(
      "GET",
      "apigateway",
      "getRoomById",
      "getRoomById",
      { studyRoomId },
      {},
      req.resKey,
      apiGateway.context
    );

    next();
  });

  return router;
};
