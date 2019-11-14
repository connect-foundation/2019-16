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

