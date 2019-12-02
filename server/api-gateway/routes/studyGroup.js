const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const fs = require("fs");
const router = express.Router();
const upload = multer();

const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const region = "kr-standard";
const {
  AWS_ACCESS_KEY: accessKeyId,
  AWS_SECRET_KEY: secretAccessKey
} = process.env;

const bucketName = "studycombined";
const bucketLink = `https://kr.object.ncloudstorage.com/${bucketName}/`;

AWS.config.update({
  accessKeyId,
  secretAccessKey
});

const S3 = new AWS.S3({
  endpoint,
  region
});

const { makePacket } = require("../../lib/tcp/util");

module.exports = function (apigateway) {
  router.get("/", (req, res) => {
    res.send("Hello");
  });

  router.post("/register", upload.single("image"), async (req, res, next) => {
    const payload = JSON.parse(req.body.data);
    const image = req.file;
    const imageSrc = `groupImage/${Date.now()}${image.originalname}`;
    const imageLink = bucketLink + imageSrc;

    try {
      await S3.putObject({
        Bucket: bucketName,
        Key: "groupImage/"
      }).promise();

      await S3.putObject({
        Bucket: bucketName,
        Key: imageSrc,
        ACL: "public-read",
        Body: image.buffer
      }).promise();
    } catch (e) {
      console.error(e);
    }

    payload.thumbnail = imageLink;

    const packet = await makePacket(
      "POST",
      "addGroup",
      "addGroup",
      { payload },
      {},
      req.resKey,
      apigateway.context
    );

    req.packet = packet;
    next();
  });

  return router;
};
