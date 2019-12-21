const { makePacket } = require("../../../../lib/tcp/util");

exports.registerValidation = (req, res, next) => {
  const input = JSON.parse(req.body.data);
  let validationObj = {};

  if (!(validationObj = validation(input)).isProper) {
    res.send({ status: 400, reason: validationObj.reason });
    return;
  }
  next();
};

exports.uploadToImage = (storage, path, bucketName, bucketLink) => async (
  req,
  res,
  next
) => {
  const image = req.file;
  const payload = JSON.parse(req.body.data);
  const { thumbnail } = payload;

  if (!image && !thumbnail) {
    req.imageLink =
      "https://kr.object.ncloudstorage.com/studycombined/groupImage/no_img.png";
    next();
    return;
  }

  if (!image) {
    req.imageLink = thumbnail;
    next();
    return;
  }

  const imageSrc = `${path}/${Date.now()}${image.originalname}`;
  const imageLink = bucketLink + imageSrc;

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
    next();
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

exports.sendGroupCreationPacket = apigateway => (req, res, next) => {
  const groupInfo = JSON.parse(req.body.data);

  groupInfo.thumbnail = req.imageLink;

  const packet = makePacket(
    "POST",
    "apigateway",
    "addGroup",
    "addGroup",
    { ...groupInfo },
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
    "apigateway",
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

exports.sendDeleteGroupPacket = apigateway => (req, res, next) => {
  const { id } = req.params;

  const packet = makePacket(
    "GET",
    "apigateway",
    "removeGroup",
    "removeGroup",
    { id },
    {},
    req.resKey,
    apigateway.context
  );

  req.packet = packet;
  next();
};

exports.sendUpdateGroupPacket = apigateway => (req, res, next) => {
  const payload = JSON.parse(req.body.data);

  payload.thumbnail = req.imageLink;

  const packet = makePacket(
    "POST",
    "apigateway",
    "updateGroup",
    "updateGroup",
    { ...payload },
    {},
    req.resKey,
    apigateway.context
  );

  req.packet = packet;
  next();
};

exports.requestToggleRegistration = apigateway => (req, res, next) => {
  const { userId, groupId } = req.body;

  const packet = makePacket(
    "POST",
    "apigateway",
    "toggleRegistration",
    "toggleRegistration",
    { userId, groupId },
    {},
    req.resKey,
    apigateway.context
  );

  req.packet = packet;
  next();
};

exports.requestToggleRecruitingState = apigateway => (req, res, next) => {
  const { groupId } = req.body;

  const packet = makePacket(
    "PATCH",
    "apigateway",
    "toggleRecruitment",
    "toggleRecruitment",
    { groupId },
    {},
    req.resKey,
    apigateway.context
  );

  req.packet = packet;
  next();
};

function validation(data) {
  if (data.category.length !== 2 || data.category.some(v => v === null))
    return { isProper: false, reason: "카테고리 두 개를 선택해주세요" };
  if (!data.title) return { isProper: false, reason: "제목을 입력해주세요" };
  if (!data.subtitle)
    return { isProper: false, reason: "부제목을 입력해주세요" };
  if (!data.days.length)
    return { isProper: false, reason: "스터디 요일을 선택해주세요" };
  if (!data.leader) return { isProper: false, reason: "잘못된 접근입니다." };
  if (!data.location || Object.values(data.location).length !== 2)
    return { isProper: false, reason: "위치를 선택해주세요" };
  return { isProper: true };
}
