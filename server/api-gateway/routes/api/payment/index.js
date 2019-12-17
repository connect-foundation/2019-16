const express = require("express");
const router = express.Router();
const { makePacket } = require("../../../../lib/tcp/util");

function paymentRouter(apiGateway) {
  router.post("/ready", (req, res, next) => {
    const { userInfo, paymentInfo, reservationInfo } = req.body;

    req.packet = makePacket(
      "POST",
      "apigateway",
      "inspectQueue",
      "inspectQueue",
      {
        userInfo,
        paymentInfo,
        reservationInfo
      },
      {},
      req.reskey,
      apiGateway.context
    );

    next();
  });

  return router;
}

module.exports = paymentRouter;
