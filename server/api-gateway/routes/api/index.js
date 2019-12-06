const express = require("express");
const Router = express.Router();
const paymentRouter = require("./payment");

Router.use("/payment", paymentRouter);

module.exports = Router;
