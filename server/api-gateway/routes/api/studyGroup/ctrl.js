const { makePacket } = require("../../../../lib/tcp/util");

exports.uploadToImage = (storage, path, bucketName, bucketLink) => async (
  req,
  res,
  next
) => {
  const image = req.file;
  const imageSrc = `${path}/${Date.now()}${image.originalname}`;
  const imageLink = bucketLink + imageSrc;

  console.log(bucketName);

  try {
    await storage
      .putObject({
        Bucket: bucketName,
        Key: `${path}/`
      })
      .promise();

    await storage
      .putObject({
        Bucket: bucketName,
        Key: imageSrc,
        ACL: "public-read",
        Body: image.buffer
      })
      .promise();

    req.imageLink = imageLink;
    console.log("good\n\n\n\n\n\n");
    next();
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

exports.sendGroupCreationPacket = apigateway => (req, res, next) => {
  const payload = JSON.parse(req.body.data);

  payload.thumbnail = req.imageLink;

  const packet = makePacket(
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
};

exports.sendGetGroupDetailPacket = apigateway => (req, res, next) => {
  const { id } = req.params;

  const packet = makePacket(
    "GET",
    "getGroupDetail",
    "getGroupDetail",
    { id },
    {},
    req.resKey,
    apigateway.context
  );

  req.packet = packet;
  next();
};
