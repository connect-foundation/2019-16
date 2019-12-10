const express = require("express");
const router = express.Router();
const payQueueInspection = require("../../../middleware/payment/payQueueInspection");
const readyToPay = require("../../../middleware/payment/readyToPay");

router.post("/ready", payQueueInspection, readyToPay);

module.exports = router;
