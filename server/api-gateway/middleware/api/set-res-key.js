const { makeKey } = require("../../../lib/tcp/util");

module.exports = function(apiGateway) {
  return async (req, res, next) => {
    const key = await makeKey(req.client);

    req.resKey = key;
    apiGateway.resMap[key] = res;
    next();
  };
};
