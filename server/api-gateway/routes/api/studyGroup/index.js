const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const { uploadToImage, sendGroupCreationPacket } = require("./ctrl");

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
    uploadToImage(studyCombinedStorage, "groupImage", bucketName, bucketLink),
    sendGroupCreationPacket(apigateway)
  );

  // router.get("/detail/:id", (req, res, next) => {
  //   const { id } = req.params;
  // });

  return router;
};
