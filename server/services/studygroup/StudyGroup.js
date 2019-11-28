const App = require("../../lib/tcp/App");
const { makePacket } = require("../../lib/tcp/util");
const StudyGroups = require("./models/StudyGroups");

class StudyGroup extends App {
  constructor(name, host, port) {
    super(name, host, port);
  }
  async onRead(socket, data) {
    const { params, query, key } = data;

    switch (query) {
      case "addGroup":
        params.payload.thumbnail = "testSrc";
        try {
          await StudyGroups.create(params.payload);
        } catch (e) {
          console.error(e);
        }
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
