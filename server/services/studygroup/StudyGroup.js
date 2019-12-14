const App = require("../../lib/tcp/App");
const StudyGroups = require("./models/StudyGroups");
const { pushStudyGroups, removeStudyGroup, updateStudyGroup } = require("../../lib/redis/studygroup");

class StudyGroup extends App {
  constructor(name, host, port) {
    super(name, host, port);
  }
  async onRead(socket, data) {
    const { params, nextQuery } = data;



    let replyData = data;

    switch (nextQuery) {
      case "addGroup":
        try {
          const groupInfo = params;

          const result = await StudyGroups.create(groupInfo);

          await pushStudyGroups(result);

          replyData.method = "REPLY";
          replyData.body = { status: 200, id: result.id };
        } catch (e) {
          console.error(e);
          replyData.method = "ERROR";
          replyData.body = e;
        }
        break;

      case "getGroupDetail":
        try {
          const { id } = params;
          const result = await StudyGroups.findById(id);

          replyData.method = "REPLY";
          replyData.body = result;
        } catch (e) {
          console.error(e);
          replyData.method = "ERROR";
          replyData.body = e;
        }
        break;

      case "removeGroup":
        try {
          const { id } = params;
          const result = await StudyGroups.findByIdAndDelete(id);

          await removeStudyGroup(result);

          replyData.method = "REPLY";
          replyData.body = { status: 200 };
        } catch (e) {
          console.error(e);
          replyData.method = "ERROR";
          replyData.body = e;
        }
        break;

      case "updateGroup":
        try {
          const groupData = params;
          const id = groupData._id;

          delete groupData._id;
          const result = await StudyGroups.findByIdAndUpdate(id, groupData);

          await updateStudyGroup(result);
          console.log(result);
          replyData.method = "REPLY";
          replyData.body = { status: 200, id };
        } catch (err) {
          console.error(e);
          replyData.method = "ERROR";
          replyData.body = e;
        }
        break;

      default:
        break;
    }
    replyData.curQuery = nextQuery;
    this.send(socket, replyData);
  }
}

module.exports = StudyGroup;
