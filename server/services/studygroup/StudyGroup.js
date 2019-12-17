const App = require("../../lib/tcp/App");
const queryMap = require("./query");

const doAndResponse = async (params, packetData, cb) => {
  const replyData = { ...packetData };

  replyData.curQuery = packetData.nextQuery;
  try {
    const result = await cb(params);

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

class StudyGroup extends App {
  constructor(name, host, port) {
    super(name, host, port);
  }

  async onRead(socket, data) {
    const { params, nextQuery } = data;
    let replyData;

    try {
      replyData = await doAndResponse(params, data, queryMap[nextQuery]);
    } catch (errReplyData) {
      replyData = errReplyData;
    }

    this.send(socket, replyData);
  }
}

module.exports = StudyGroup;
