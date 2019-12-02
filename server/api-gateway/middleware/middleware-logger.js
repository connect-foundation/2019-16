const uuidv1 = require("uuid/v1");

module.exports = function(apigateway) {
  const gatewayLogger = (req, res, next) => {
    const traceId = uuidv1();

    // apigateway.appClientMap.log.write(packet);
    apigateway.httpLogSender({
      "http.method": req.method,
      "http.path": req.path
    });
    res.append("Trace", traceId);
    next();
  };

  return gatewayLogger;
};
