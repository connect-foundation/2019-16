const redis = require("redis");
const client = redis.createClient();

exports.saveApp = async (appName, { host, port }) => {
  let isAlready = 0;

  await new Promise(res => {
    client.exists(appName, (err, bool) => {
      isAlready = bool;
      res();
    });
  });
  return new Promise(res => {
    let resultBool = false;

    if (isAlready === 0) {
      client.hset(appName, "host", host, "port", port);
      resultBool = true;
    } else resultBool = false;
    res(resultBool);
  });
};

exports.updatdApp = (appName, { host, port }) => {
  let resultBool = false;

  return new Promise(res => {
    client.del(appName, (err, bool) => {
      if (!err) {
        client.hset(appName, "host", host, "port", port);
        resultBool = true;
      } else {
        resultBool = false;
      }
      res(resultBool);
    });
  });
};

exports.getApp = appName => {
  return new Promise(resolve => {
    client.hgetall(appName, (objErr, res) => {
      resolve(res);
    });
  });
};