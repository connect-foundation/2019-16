const express = require("express");
const router = express.Router();

const { makePacket } = require("../../lib/tcp/util");

module.exports = function(apigateway) {
  router.get(
    "/query/:searchWord/location/:lat/:lon/:isRecruit",
    async (req, res, next) => {
      const { searchWord, lat, lon, isRecruit = true } = req.params;

      req.packet = makePacket(
        "POST",
        "searchStudyGroup",
        "searchStudyGroup",
        { searchWord, lat, lon, isRecruit },
        {},
        req.resKey,
        apigateway.context
      );
      next();
    }
  );

  router.get(
    "/query/:searchWord/category/:category/location/:lat/:lon/:isRecruit",
    async (req, res, next) => {
      const { searchWord, category, lat, lon, isRecruit } = req.params;

      req.packet = makePacket(
        "POST",
        "searchStudyGroupWithCategory",
        "searchStudyGroupWithCategory",
        { searchWord, category, lat, lon, isRecruit },
        {},
        req.resKey,
        apigateway.context
      );

      next();
    }
  );

  router.post("/tags", async (req, res, next) => {
    const { tags, category, lat, lon, isRecruit } = req.body;

    if (category === undefined)
      req.packet = makePacket(
        "POST",
        "tagStudyGroup",
        "tagStudyGroup",
        { tags, lat, lon, isRecruit },
        {},
        req.resKey,
        apigateway.context
      );

    if (category !== undefined)
      req.packet = makePacket(
        "POST",
        "tagStudyGroupWithCategory",
        "tagStudyGroupWithCategory",
        { tags, isRecruit, lat, lon, category },
        {},
        req.resKey,
        apigateway.context
      );

    next();
  });

  router.get("/all/location/:lat/:lon/:isRecruit", async (req, res, next) => {
    const { lat, lon, isRecruit } = req.params;

    req.packet = makePacket(
      "POST",
      "searchAllStudyGroup",
      "searchAllStudyGroup",
      { lat, lon, isRecruit },
      {},
      req.resKey,
      apigateway.context
    );

    next();
  });

  router.get(
    "/all/category/:category/location/:lat/:lon/:isRecruit",
    async (req, res, next) => {
      const { category, lat, lon, isRecruit } = req.params;

      req.packet = makePacket(
        "POST",
        "searchAllStudyGroupWithCategory",
        "searchAllStudyGroupWithCategory",
        { category, lat, lon, isRecruit },
        {},
        req.resKey,
        apigateway.context
      );

      next();
    }
  );
  return router;
};
