const App = require("../../lib/tcp/App");
const StudyGroups = require("./models/StudyGroups");
const { pushStudyGroups } = require("../../lib/redis");

class StudyGroup extends App {
  constructor(name, host, port) {
    super(name, host, port);
  }
  async onRead(socket, data) {
    const { params, curQuery } = data;

    this.tcpLogSender(curQuery);

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
        }
        break;

      case "getGroupDetail":
        try {
          const { id: _id } = params;
          const result = await StudyGroups.findOne({ _id });

          replyData.method = "REPLY";
          replyData.body = result;
        } catch (e) {
          console.error(e);
          replyData.method = "ERROR";
          replyData.body = e;
        }
        break;

      default:
        break;
    }

    this.send(socket, replyData);
  }
}

module.exports = StudyGroup;
