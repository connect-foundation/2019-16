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

<<<<<<< HEAD
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
=======
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
>>>>>>> b8c70b5... fix(lib/redis): returnRedisPromise 함수 생성 및 사용
};

exports.getAppbypName = appName => {
  return returnRedisPromise("hgetall", appName);
};

exports.getAllApps = async () => {

  const keys = await returnRedisPromise("keys", "*");
  const apps = keys.reduce(async (promise, key) => {
    let appList = await promise.then();
    const app = await returnRedisPromise("hgetall", key);

<<<<<<< HEAD
          await new Promise(r => {
            client.hgetall(cur, (objErr, app) => {
              if (!objErr) appList.push(app);
              r();
            });
          });
          return Promise.resolve(appList);
        }, Promise.resolve([]));
        res();
      });
    });
    resolve(apps);
  });
=======
    appList.push(app);
    return Promise.resolve(appList);
  }, Promise.resolve([]))

  return apps;
>>>>>>> b8c70b5... fix(lib/redis): returnRedisPromise 함수 생성 및 사용
};