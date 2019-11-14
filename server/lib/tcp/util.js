const bcrypt = require("bcrypt");

const PACKET_SPLITTER = "|";


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

  return JSON.stringify(packet) + PACKET_SPLITTER;
}

exports.PACKET_SPLITTER = PACKET_SPLITTER;
