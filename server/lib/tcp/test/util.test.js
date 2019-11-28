const { makeKey, makePacket } = require('../util')

/**
 * makeKey test
 */
test("same hash key", () => {
    const socket = {
        remoteAddress: '127.0.0.1',
        remotePort: 9000
    }
    const key1 = makeKey(socket)
    const key2 = makeKey(socket)

    expect(key1).toEqual(key2);
})
/**
 * makePacket test
 */
test("return string packet", () => {
    const packet = makePacket("POST", "distribute", { id: "test", password: "pwd" }, {}, 'key', { host: "127.0.0.1", port: 1234, name: "test" })
    const expect_packet = `{"method":"POST","query":"distribute","params":{"id":"test","password":"pwd"},"body":{},"key":"key","info":{"host":"127.0.0.1","port":1234,"name":"test"}}|`

    expect(packet).toEqual(expect_packet);
})