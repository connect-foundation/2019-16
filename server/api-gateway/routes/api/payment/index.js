const express = require("express");
const router = express.Router();
const { makePacket } = require("../../../../lib/tcp/util");

function paymentRouter(apiGateway) {
  router.post("/ready", (req, res, next) => {
    const { userId, paymentInfo, reservationInfo } = req.body;

    req.packet = makePacket(
      "POST",
      "apigateway",
      "inspectQueue",
      "inspectQueue",
      {
        userId,
        paymentInfo,
        reservationInfo
      },
      {},
      req.resKey,
      apiGateway.context
    );
    next();
  });

  router.get("/approval/:roomId/:userId", (req, res, next) => {
    const { pg_token } = req.query;
    const { roomId, userId } = req.params;

    req.packet = makePacket(
      "POST",
      "apigateway",
      "approvePayment",
      "removeInQueue",
      {
        pg_token,
        userId,
        roomId
      },
      {},
      req.resKey,
      apiGateway.context
    );
    next();
  });

  return router;
}

module.exports = paymentRouter;
