var express = require("express");
var router = express.Router();

const { makePacket } = require("../../lib/tcp/util");

module.exports = function(apigateway) {
  router.get("/query/:searchWord/:isRecruit", async (req, res, next) => {
    const { searchWord, isRecruit = true } = req.params;

    req.packet = makePacket(
      "POST",
      "searchStudyGroup",
      { searchWord, isRecruit },
      {},
      req.resKey,
      apigateway.context
    );

    next();
  });

  router.get(
    "/query/:searchWord/:category/:isRecruit",
    async (req, res, next) => {
      const { searchWord, category, isRecruit } = req.params;

      req.packet = makePacket(
        "POST",
        "searchStudyGroupWithCategory",
        { searchWord, category, isRecruit },
        {},
        req.resKey,
        apigateway.context
      );

      next();
    }
  );

  router.post("/tags", async (req, res, next) => {
    const { tags, category, isRecruit } = req.body;

    if (category === undefined)
      req.packet = makePacket(
        "POST",
        "tagStudyGroup",
        { tags, isRecruit },
        {},
        req.resKey,
        apigateway.context
      );

    if (category !== undefined)
      req.packet = makePacket(
        "POST",
        "tagStudyGroupWithCategory",
        { tags, isRecruit, category },
        {},
        req.resKey,
        apigateway.context
      );

    next();
  });

  router.get("/all/:isRecruit", async (req, res, next) => {
    const { isRecruit } = req.params;

    req.packet = makePacket(
      "POST",
      "searchAllStudyGroup",
      { isRecruit },
      {},
      req.resKey,
      apigateway.context
    );

    next();
  });

  router.get("/all/:category/:isRecruit", async (req, res, next) => {
    const { category, isRecruit } = req.params;

    req.packet = makePacket(
      "POST",
      "searchAllStudyGroupWithCategory",
      { category, isRecruit },
      {},
      req.resKey,
      apigateway.context
    );

    next();
  });

  return router;
};
