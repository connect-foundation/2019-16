const express = require("express");
const router = express.Router();
const inspectPayQueue = require("../../../middleware/payment/inspectPayQueue");
const readyToPay = require("../../../middleware/payment/readyToPay");

function paymentRouter() {
  router.post("/ready", inspectPayQueue, readyToPay);

  return router;
}

module.exports = paymentRouter;
