const redis = require("redis");
const redisClient = redis.createClient(6379, "106.10.57.60");
// const redisClient = redis.createClient();

const { makePacket, makeKey } = require("../../tcp/util");
const TcpServer = require("../../tcp/tcpServer");
const TcpClient = require("../../tcp/tcpClient");
const { setAppbyKey, deletebyKey, updateAppbyKey, getAppbyKey, getAppbyName, getAllApps, pushStudyGroups, popStudyGroups } = require("../index")

function returnRedisPromise(command, ...params) {
  return new Promise((res, rej) => {
    redisClient[command](...params, (err, reply) => {
      if (err) rej(err);
      res(reply);
    })
  })
}


/**
 * setAppbyKey deleteAppbyKey getAppbyKey test
 */
test("setAppbyKey deleteAppbyKey getAppbyKey test", async () => {
  await returnRedisPromise("flushall");

  const socket = {
    remoteAddress: '127.0.0.1',
    remotePort: 9000
  }
  const info = {
    name: 'test',
    host: '127.0.0.1',
    port: '9000'
  }
  const key = await makeKey(socket)

  await returnRedisPromise("flushall");
  await setAppbyKey(key, info);

  const expectApp = await getAppbyKey(key)

  expect(info).toEqual(expectApp);
  await returnRedisPromise("flushall");
})

/**
 * getAppbyName test
 */
test("getAppbyName test", async () => {
  await returnRedisPromise("flushall");
  const socket = {
    remoteAddress: '127.0.0.1',
    remotePort: 9000
  }
  const info = {
    name: 'test',
    host: '127.0.0.1',
    port: '9000'
  }
  const key = await makeKey(socket)

  await setAppbyKey(key, info);

  const expectApp = await getAppbyName(info.name)

  expect(expectApp).toEqual(info);
  await returnRedisPromise("flushall");
})


/**
 * getAllApp test
 */
test("getAllApp test", async () => {
  const socket1 = {
    remoteAddress: '127.0.0.1',
    remotePort: 9000
  }
  const info1 = {
    name: 'test1',
    host: '127.0.0.1',
    port: '9000'
  }

  const socket2 = {
    remoteAddress: '127.0.0.1',
    remotePort: 9001
  }
  const info2 = {
    name: 'test2',
    host: '127.0.0.1',
    port: '9001'
  }

  const key1 = await makeKey(socket1);
  const key2 = await makeKey(socket2);

  await returnRedisPromise("flushall");

  await setAppbyKey(key1, info1);
  await setAppbyKey(key2, info2);

  const expectApps = await getAllApps()

  expect([info2, info1]).toEqual(expectApps);
  await returnRedisPromise("flushall");
})

/**
 * pushStudyGroups and popStudyGroups test
 */
test("pushStudyGroups test", async () => {
  await returnRedisPromise("flushall");

  const groups = [{ name: "group1" }, { name: "group1" }, { name: "group2" }, { name: "group3" }, { name: "group4" }];

  await pushStudyGroups(groups);
  const result = await popStudyGroups(5);

  expect(result).toEqual(groups);
  await returnRedisPromise("flushall");
})


