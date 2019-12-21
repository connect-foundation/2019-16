const App = require("../../lib/tcp/App");
const queryMap = require("./query");

const doAndResponse = async (params, packetData, cb) => {
  const replyData = { ...packetData };

  replyData.curQuery = packetData.nextQuery;
  try {
    const result = await cb(params);

    if (replyData.curQuery === "toggleRegistration") {
      replyData.nextQuery = "updateJoiningGroups";
    }
    if (replyData.curQuery === "addGroup") {
      replyData.nextQuery = "updateOwnGroups";
    }
    if (replyData.curQuery === "removeGroup") {
      replyData.nextQuery = "deleteGroupInUsers";
    }
    replyData.method = "REPLY";
    replyData.body = result;

    return replyData;
  } catch (e) {
    console.error(e);
    replyData.method = "ERROR";
    replyData.body = { msg: e, status: 400 };
    return replyData;
  }
};

async function doJob(data, appName_) {
  const { params, nextQuery } = data;
  let replyData;
  let appName = appName_;

  try {
    replyData = await doAndResponse(params, data, queryMap[nextQuery]);
    if (
      replyData.nextQuery === "updateJoiningGroups" ||
      replyData.nextQuery === "updateOwnGroups"
    ) {
      replyData.params = {
        userId: replyData.body.userId,
        joiningGroup: replyData.body.joiningGroup,
        ownGroup: replyData.body.ownGroup,
        addMode: !replyData.body.isJoiner
      };
      appName = "user";
    }
    if (replyData.nextQuery === "deleteGroupInUsers") {
      const group = replyData.body.group;

      replyData.params = { group };
      appName = "user";
    }
  } catch (errReplyData) {
    replyData = errReplyData;
  } finally {
    this.send(replyData, appName);
  }
}
class StudyGroup extends App {
  constructor(name, host, port) {
    super(name, host, port, doJob);
  }
}

module.exports = StudyGroup;
