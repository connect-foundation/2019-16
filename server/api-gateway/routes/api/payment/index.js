const express = require("express");
const Router = express.Router();
const payQueueInspection = require("../../../middleware/payment/payQueueInspection");
const readyToPay = require("../../../middleware/payment/readyToPay");

Router.post("/ready", payQueueInspection, readyToPay);

module.exports = Router;
