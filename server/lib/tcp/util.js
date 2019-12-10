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
  toQuery,
  endQuery,
  params,
  body,
  key,
  info
) => {
  const packet = {
    method,
    curQuery,
    toQuery,
    endQuery,
    params,
    body,
    key,
    info
  };

  return JSON.stringify(packet) + PACKET_SPLITTER;
};

exports.PACKET_SPLITTER = PACKET_SPLITTER;
