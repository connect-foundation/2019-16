const uuidv1 = require("uuid/v1");
const { makePacket } = require("./util");

const generateId = Epoch => {
  const timestampId = uuidv1({ msecs: Epoch });

  return timestampId;
};

/**
 * http/tcp 통신에 따라서 로그를 생성하고
 * 로그 서비스로 전송하는 함수를 만든다.
 * @param {string} networkType : 통신 타입(tcp/http)
 */
function makeLogSender(networkType) {
  const { name } = this.context;

  switch (networkType) {
    case "tcp":
      return function send(query, ...parentData) {
        const timestamp = Math.floor(Date.now() / 1);
        const logData = {
          query,
          spanId: generateId(timestamp),
          service: name,
          timestamp
        };

        this.logService.write(
          makePacket(
            "POST",
            "log",
            "log",
            {},
            { data: logData },
            "",
            this.context
          )
        );
      };
    case "http":
      return function send(httpPathandMethod) {
        const timestamp = Math.floor(Date.now() / 1);
        const logData = {
          ...httpPathandMethod,
          spanId: generateId(timestamp),
          service: this.name,
          timestamp
        };

        this.logService.write(
          makePacket(
            "POST",
            "log",
            "log",
            {},
            { data: logData },
            "",
            this.context
          )
        );
      };
    default:
      return false;
  }
}

module.exports = { makeLogSender };
