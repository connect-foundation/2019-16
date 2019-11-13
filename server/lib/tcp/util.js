const bcrypt = require("bcrypt");

exports.makeKey = async() => {
  const key = socket.remoteAddress + socket.remotePort
  const hashedKey = await bcrypt.hash(key, 1);
  return hashedKey;
}
