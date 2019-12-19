const express = require("express");
const router = express.Router();
const paymentRouter = require("./payment");
const searchRouter = require("./search");
const studyGroupRouter = require("./studyGroup");
const studyRoomRouter = require("./studyRoom");
const userRouter = require("./user")

function apiRouter(apiGateway) {
  router.use("/payment", paymentRouter(apiGateway));
  router.use("/search", searchRouter(apiGateway));
  router.use("/studygroup", studyGroupRouter(apiGateway));
  router.use("/studyroom", studyRoomRouter(apiGateway));
  router.use("/user", userRouter(apiGateway));
  return router;
}

module.exports = apiRouter;
