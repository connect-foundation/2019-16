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

exports.setAppbyKey = async (key, { name, host, port }) => {

  const isAlreadyExist = await returnRedisPromise("exists", key);


  if (isAlreadyExist === 0) return returnRedisPromise("hset", key, "name", name, "host", host, "port", port);

  return new Promise(res => {
    res(0);
  })
};

exports.deletebyKey = async (key) => {

  return returnRedisPromise("del", key);
};

exports.updatdAppbyKey = (key, { name, host, port }) => {
  return returnRedisPromise("hset", key, "name", name, "host", host, "port", port);
};

exports.getAppbyKey = (key) => {
  return returnRedisPromise("hgetall", key);
};

exports.getAppbyName = async (name) => {
  const apps = await this.getAllApps();

  return new Promise((res) => {
    const result = apps.filter(app => app.name === name);

    res(result[0]);
  })
}

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

