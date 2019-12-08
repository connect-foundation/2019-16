const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const {
  registerValidation,
  uploadToImage,
  sendGroupCreationPacket,
  sendGetGroupDetailPacket
} = require("./ctrl");

const {
  AWS_ACCESS_KEY: accessKeyId,
  AWS_SECRET_KEY: secretAccessKey
} = process.env;

const bucketName = "studycombined";
const {
  bucketLink,
  S3: studyCombinedStorage
} = require("../../../lib/setObjectStorage")(
  accessKeyId,
  secretAccessKey,
  bucketName
);

module.exports = function(apigateway) {
  router.post(
    "/register",
    upload.single("image"),
    registerValidation,
    uploadToImage(studyCombinedStorage, "groupImage", bucketName, bucketLink),
    sendGroupCreationPacket(apigateway)
  );

  router.get("/detail/:id", sendGetGroupDetailPacket(apigateway));

  return router;
};
