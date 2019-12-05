const App = require("../../lib/tcp/App");
const StudyGroups = require("./models/StudyGroups");
const { pushStudyGroups } = require("../../lib/redis");

class StudyGroup extends App {
  constructor(name, host, port) {
    super(name, host, port);
  }
  async onRead(socket, data) {
    const { params, curQuery } = data;
    let replyData = data;

    switch (curQuery) {
      case "addGroup":
        try {
          const groupInfo = params.payload;

          await StudyGroups.create(groupInfo);
          await pushStudyGroups(groupInfo);

          replyData.method = "REPLY";
          replyData.body = { href: "/" };
        } catch (e) {
          console.error(e);
          replyData.method = "ERROR";
          replyData.body = e;
          // packet = makePacket("ERROR", query, {}, {}, key, this.context);
        }
        break;

      default:
        break;
    }

    this.send(socket, replyData);
  }
}

module.exports = StudyGroup;
