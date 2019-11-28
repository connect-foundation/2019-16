const App = require("../../lib/tcp/App");
const { makePacket } = require("../../lib/tcp/util");

class StudyGroup extends App {
  constructor(name, host, port) {
    super(name, host, port);
  }
  async onRead(socket, data) {
    const { params, query, key } = data;
    let result;

    switch (query) {
      case "addGroup":
        //
        break;

      default:
        break;
    }
    const packet = makePacket("REPLY", query, {}, {}, key, this.context);

    this.send(socket, packet);
  }
  send(socket, packet) {
    socket.write(packet);
  }
}

module.exports = StudyGroup;
