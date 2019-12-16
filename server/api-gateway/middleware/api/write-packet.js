module.exports = function(apiGateway) {
  return (req, res, next) => {
    try {
      if (req.path !== "/favicon.ico") {
        const appName = req.path.split("/")[1];

        apiGateway.appClientMap[appName].write(req.packet);
      }
    } catch (e) {
      let error = new Error("잘못된 라우터로 요청이 들어왔습니다. ");

      apiGateway.resMap[req.resKey].status(error.status || 500);
      apiGateway.resMap[req.resKey].send(
        error.message || "잘못된 라우터로 요청이 들어왔습니다."
      );
      delete apiGateway.resMap[req.resKey];
    }
  };
};
