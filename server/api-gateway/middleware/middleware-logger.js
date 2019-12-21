const uuidv1 = require("uuid/v1");
const qs = require("querystring");

module.exports = function(apigateway) {
  const gatewayLogger = (req, res, next) => {
    const traceId = uuidv1();
    const encodedurl = qs.unescape(req.path);
    // apigateway.appClientMap.log.write(packet);
    apigateway.httpLogSender({
      "http.method": req.method,
      "http.path": encodedurl,
      spanId: traceId,
      traceId: traceId
    });
    res.setHeader("trace-id", traceId);

    next();
  };

  return gatewayLogger;
};
