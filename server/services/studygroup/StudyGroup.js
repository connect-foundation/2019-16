const App = require("../../lib/tcp/App");
const { makePacket } = require("../../lib/tcp/util");
const StudyGroups = require("./models/StudyGroups");
const { pushStudyGroups } = require("../../lib/redis");

class StudyGroup extends App {
  constructor(name, host, port) {
    super(name, host, port);
  }
  async onRead(socket, data) {
    const { params, query, key } = data;
    let packet;

    switch (query) {
      case "addGroup":
        try {
          const result = await StudyGroups.create(params.payload);
          result.leader = result.leader.name;
          result["now_personnel"] = 1;
          result.days = result.selectedDays;
          result.isRecruit = result.isRecruiting;
          result.description = result.intro;

          pushStudyGroups(result);

          packet = makePacket(
            "REPLY",
            query,
            {},
            { href: "/" },
            key,
            this.context
          );
        } catch (e) {
          console.error(e);
          packet = makePacket("ERROR", query, {}, {}, key, this.context);
        }
        break;

      default:
        break;
    }

    this.send(socket, packet);
  }
  send(socket, packet) {
    socket.write(packet);
  }
}

module.exports = StudyGroup;
