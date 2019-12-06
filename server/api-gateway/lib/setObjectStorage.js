const AWS = require("aws-sdk");

module.exports = function(accessKeyId, secretAccessKey, bucketName) {
  const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
  const region = "kr-standard";

  const bucketLink = `https://kr.object.ncloudstorage.com/${bucketName}/`;

  AWS.config.update({
    accessKeyId,
    secretAccessKey
  });

  const S3 = new AWS.S3({
    endpoint,
    region
  });

  return { bucketLink, S3 };
};
