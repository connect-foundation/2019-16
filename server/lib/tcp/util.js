const crypto = require("crypto");

const PACKET_SPLITTER = "|";

exports.makeKey = async socket => {
  const key = socket.remoteAddress + String(socket.remotePort);
  const hashedKey = crypto
    .createHash("sha512")
    .update(key)
    .digest("base64");

  return hashedKey;
};

exports.makePacket = (
  method,
  curQuery,
  nextQuery,
  endQuery,
  params,
  body,
  key,
  info
) => {
  const packet = {
    method,
    curQuery,
    nextQuery,
    endQuery,
    params,
    body,
    key,
    info
  };

  return JSON.stringify(packet) + PACKET_SPLITTER;
};

exports.isLogService = name => {
  if (name === process.env.LOG_NAME) return true;
  return false;
};

exports.isErrorPacket = method => {
  if (method === this.ERROR_PACKET_CODE) return true;
  return false;
};
exports.PACKET_SPLITTER = PACKET_SPLITTER;

exports.ERROR_PACKET_CODE = "ERROR";
