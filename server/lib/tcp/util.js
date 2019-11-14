const bcrypt = require("bcrypt");

exports.makeKey = async(socket) => {
  const key = socket.remoteAddress + socket.remotePort
  const hashedKey = await bcrypt.hash(key, 1);

  return hashedKey;
}

exports.makePacket = (method, query, params, body, info)=>{
  const packet = {
    method,
    query,
    params,
    body,
    info
  }

  return packet;
}