const redis = require("redis");
const client = redis.createClient(6379, "106.10.57.60");
// const client = redis.createClient();

function returnRedisPromise(command, ...params) {

  return new Promise((res, rej) => {
    client[command](...params, (err, reply) => {
      if (err) rej(err);
      res(reply);
    })
  })
}

exports.setAppbyKey = async (key, { name, host, port }) => {

  const isAlreadyExist = await returnRedisPromise("exists", `name:${name}`);


  if (isAlreadyExist === 0) {
    client.set(`name:${name}`, key);
    return returnRedisPromise("hmset", key, "name", name, "host", host, "port", port);
  }
  return new Promise(res => {
    res(0);
  })
};

exports.deletebyKey = async (key) => {
  const app = await this.getAppbyKey(key);

  client.del(`name:${app.name}`);
  return returnRedisPromise("del", key);
};

exports.updatdAppbyKey = (key, { name, host, port }) => {
  return returnRedisPromise("hmset", key, "name", name, "host", host, "port", port);
};

exports.getAppbyKey = (key) => {
  return returnRedisPromise("hgetall", key);
};

exports.getAppbyName = async (name) => {

  const key = await returnRedisPromise("get", `name:${name}`);

  return this.getAppbyKey(key);

}

exports.getAllApps = async () => {

  const keys = await returnRedisPromise("keys", "*name*");
  const apps = keys.reduce(async (promise, appKey) => {
    let appList = await promise.then();
    const key = await returnRedisPromise("get", appKey);
    const app = await returnRedisPromise("hgetall", key);

    appList.push(app);
    return Promise.resolve(appList);
  }, Promise.resolve([]))

  return apps;
};