const { makePacket, makeKey } = require("../../tcp/util");
const TcpServer = require("../../tcp/tcpServer");
const TcpClient = require("../../tcp/tcpClient");
const { setAppbyKey, deletebyKey, updateAppbyKey, getAppbyKey, getAllApps } = require("../index")



/**
 * setAppbyKey deleteAppbyKey getAppbyKey test
 */
test("setAppbyKey deleteAppbyKey getAppbyKey test", async () => {
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

  await deletebyKey(key);
  await setAppbyKey(key, info);

  const expectApp = await getAppbyKey(key)

  await deletebyKey(key);
  expect(info).toEqual(expectApp);
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

  const key1 = await makeKey(socket1)
  const key2 = await makeKey(socket2)

  await deletebyKey(key1);
  await deletebyKey(key2);

  await setAppbyKey(key1, info1);
  await setAppbyKey(key2, info2);

  const expectApps = await getAllApps()

  expect([info1, info2]).toEqual(expect.arrayContaining(expectApps));
})