const uuidv1 = require("uuid/v1");
const { makePacket } = require("../../lib/tcp/util");

module.exports = function(apigateway) {
  const gatewayLogger = (req, res, next) => {
    const timestamp = Math.floor(Date.now() / 1);
    const traceId = uuidv1();

    const log = {
      traceId,
      id: traceId,
      kind: "Gateway",
      name: `${req.method} ${req.baseUrl}`,
      timestamp,
      "http.path": req.baseUrl
    };

    // console.log(log);
    const packet = makePacket(
      "POST",
      "log",
      {},
      { log },
      req.resKey,
      apigateway.context
    );

    apigateway.appClientMap.log.write(packet);
    next();
  };

  return gatewayLogger;
};
