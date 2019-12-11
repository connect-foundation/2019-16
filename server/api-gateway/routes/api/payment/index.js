const express = require("express");
const router = express.Router();
const inspectPayQueue = require("../../../middleware/payment/inspectPayQueue");
const readyToPay = require("../../../middleware/payment/readyToPay");

router.post("/ready", inspectPayQueue, readyToPay);

module.exports = router;
