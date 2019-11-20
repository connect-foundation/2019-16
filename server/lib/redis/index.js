const redis = require("redis");
const client = redis.createClient();

function returnRedisPromise(command, ...params) {

  return new Promise((res, rej) => {
    client[command](...params, (err, reply) => {
      if (err) rej(err);
      res(reply);
    })
  })
}

exports.setAppbypName = async (appName, { host, port }) => {

  const isAlreadyExist = await returnRedisPromise("exists", appName);

  if (isAlreadyExist === 0) return returnRedisPromise("hset", appName, "host", host, "port", port);

  return new Promise(res => {
    res(0);
  })
};

exports.deletebypName = async (appName, { host, port }) => {

  return returnRedisPromise("hset", appName, "host", host, "port", port);
};

exports.updatdAppbypName = (appName, { host, port }) => {
  return returnRedisPromise("hset", appName, "host", host, "port", port);
};

exports.getAppbypName = appName => {
  return returnRedisPromise("hgetall", appName);
};

exports.getAllApps = async () => {

  const keys = await returnRedisPromise("keys", "*");
  const apps = keys.reduce(async (promise, key) => {
    let appList = await promise.then();
    const app = await returnRedisPromise("hgetall", key);

    appList.push(app);
    return Promise.resolve(appList);
  }, Promise.resolve([]))

  return apps;
};