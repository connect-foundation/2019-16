const express = require("express");
const router = express.Router();


const { makePacket } = require("../../lib/tcp/util");

module.exports = function (apigateway) {

  router.get("/query/:searchWord/:isRecruit", async (req, res, next) => {
    const { searchWord, isRecruit = true } = req.params;

    req.packet = makePacket(
      "POST",
      "searchStudyGroup",
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
