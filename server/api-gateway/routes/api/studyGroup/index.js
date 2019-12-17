const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const {
  registerValidation,
  uploadToImage,
  sendGroupCreationPacket,
  sendGetGroupDetailPacket,
  sendDeleteGroupPacket,
  sendUpdateGroupPacket,
  requestToggleRegistration,
  requestToggleRecruitingState
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

module.exports = function(apiGateway) {
  router.post(
    "/register",
    upload.single("image"),
    registerValidation,
    uploadToImage(studyCombinedStorage, "groupImage", bucketName, bucketLink),
    sendGroupCreationPacket(apiGateway)
  );

  router.get("/detail/:id", sendGetGroupDetailPacket(apiGateway));
  router.put(
    "/detail",
    upload.single("image"),
    registerValidation,
    uploadToImage(studyCombinedStorage, "groupImage", bucketName, bucketLink),
    sendUpdateGroupPacket(apiGateway)
  );
  router.delete("/detail/:id", sendDeleteGroupPacket(apiGateway));

  router.post("/toggleRegistration", requestToggleRegistration(apiGateway));

  router.patch("/recruit", requestToggleRecruitingState(apiGateway));

  return router;
};
