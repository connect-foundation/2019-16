/*
exports.getAllApps = () => {
  let apps;

  return new Promise(async resolve => {
    await new Promise(res => {
      client.keys("*", async (keyErr, keys) => {
        apps = await keys.reduce(async (promise, cur) => {
          let appList = await promise.then();

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
};
*/

const redisPromise = (command, ...params) => {
  return new Promise((resolve, reject) => {
    const callback = (err, reply) => {
      if (err) reject(err);
      resolve(reply);
    };
    redis[command](...params, callback);
  });
};

// refacotring 1

function* map(iter, f) {
  for (const elem of iter) {
    yield elem instanceof Promise ? elem.then(f) : f(elem);
  }
}

async function reduceAsync(iter, f, acc) {
  let result = acc;
  for await (const elem of iter) {
    result = f(result, elem);
  }

  return result;
}

exports.getAllApps = async () => {
  const keys = await returnRedisPromise("keys", "*");

  const apps = await reduceAsync(
    map(keys, key => returnRedisPromise("hgetall", key)),
    (appList, app) => appList.concat(app),
    []
  );
  return apps;
};

// refactoring 2
exports.getAllApps = async () => {
  const keys = await returnRedisPromise("keys", "*");
  const appList = [];

  for (const key of keys) {
    const app = await returnRedisPromise("hgetall", key);
    appList.push(app);
  }

  return appList;
};
