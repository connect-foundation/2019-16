const redis = require("redis");
const redisClient = redis.createClient(6379, "106.10.57.60");
//const redisClient = redis.createClient();
const { makeKey, makePacket } = require('../util')

const AppListManager = require("../../../services/applistmanager/AppListManager");
const appListManager = new AppListManager("AppListManager", "127.0.0.1", 8100);

const App = require("../App")
const { getAppbyName } = require("../../redis")

function returnRedisPromise(command, ...params) {
  return new Promise((res, rej) => {
    redisClient[command](...params, (err, reply) => {
      if (err) rej(err);
      res(reply);
    })
  })
}

/**
 * applistmanager 접속 테스트
 */

test("applistmanager connet test", async () => {
  await returnRedisPromise("flushall");
  class TestApp extends App {
    constructor(name, host, port) {
      super(name, host, port);
    }
    onCreate() {
      console.log("test server start")
    }
    onRead(socket, data) {
      console.log(data);
    }
    onClose() {

    }
  }

  const testapp = new TestApp("testapp", "127.0.0.1", 8001);

  testapp.connectToAppListManager();

  setTimeout(async () => {
    expect(testapp.isConnectToAppListManager).toEqual(true);
    // await this.returnRedisPromise("flushall");
    testapp.end();
  }, 0);

})

// /**
//  * query : add test
//  */

// test("applistmanager add test", async () => {
//   await returnRedisPromise("flushall");
//   class TestApp extends App {
//     constructor(name, host, port) {
//       super(name, host, port);
//     }
//     onCreate() {
//       console.log("test server start")
//     }
//     onRead(socket, data) {
//       console.log(data);
//     }
//     onClose() {

//     }
//   }

//   const testapp = new TestApp("testapp", "127.0.0.1", 8002);

//   const listManagerClient = testapp.connectToAppListManager();

//   const packet = makePacket("POST", "add", {}, {}, { name: "test", "host": "127.0.0.1", "port": 8003 });

//   listManagerClient.write(packet);


//   setTimeout(async () => {
//     const result = await getAppbyName("test");

//     expect(result).toEqual({ "name": "test", "host": "127.0.0.1", "port": 8003 });
//     // await this.returnRedisPromise("flushall");
//   }, 0);

// })
