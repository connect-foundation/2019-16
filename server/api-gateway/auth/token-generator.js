const jwt = require("jsonwebtoken");

/**
 * JWT 토큰을 생성하는 함수
 * @param {Object} data 토큰에 저장할 데이터 객체
 * @returns jsonwebtoken
 */
const generateToken = data => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

  return token;
};

module.exports = generateToken;
