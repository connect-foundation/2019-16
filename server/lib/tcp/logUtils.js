const uuidv1 = require("uuid/v1");
const { makePacket } = require("./util");

const generateId = Epoch => {
  return new Promise(res => {
    const uuid = uuidv1({ msecs: Epoch });

    res(uuid);
  });
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
      return async function send(query, ...restData) {
        const timestamp = Date.now();
        let spanId;
        let errorMsg;
        let error;

        if (restData[0]) {
          const restObject = restData[0];
          if (restObject.hasOwnProperty("spanId")) spanId = restObject.spanId;
          if (restObject.hasOwnProperty("error")) {
            error = restObject.error;
            errorMsg = restObject.errorMsg;
          }
        } else {
          spanId = await generateId(timestamp);
        }
        const logData = {
          query,
          spanId,
          service: name,
          timestamp,
          error,
          errorMsg
        };

        this.logService.write(
          makePacket(
            "POST",
            "log",
            "log",
            "log",
            {},
            { data: logData },
            "",
            this.context
          )
        );
        return spanId;
      };
    case "http":
      return async function send(httpLogData) {
        const timestamp = Date.now();

        const logData = {
          ...httpLogData,
          service: "gateway",
          timestamp
        };

        this.logService.write(
          makePacket(
            "POST",
            "log",
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
