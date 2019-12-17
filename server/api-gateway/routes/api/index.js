const express = require("express");
const router = express.Router();
const paymentRouter = require("./payment");
const searchRouter = require("./search");
const studyGroupRouter = require("./studyGroup");
const studyRoomRouter = require("./studyRoom");
const suggestRouter = require("./suggest");

function apiRouter(apigateway) {
  router.use("/payment", paymentRouter());
  router.use("/search", searchRouter(apigateway));
  router.use("/studygroup", studyGroupRouter(apigateway));
  router.use("/studyroom", studyRoomRouter(apigateway));
  router.use("/suggest", suggestRouter(apigateway));
  return router;
}

module.exports = apiRouter;
