const App = require("../../lib/tcp/App");
const { queryResolver } = require("./queryResolver");

async function jobEexcutor(socket, data) {
  const { params, curQuery } = data;
  let queryResult;

  try {
    queryResult = await queryResolver(curQuery, params);
  } catch (error) {
    queryResult = { method: "ERROR", body: { error } };
  } finally {
    this.send(socket, {
      ...data,
      ...queryResult
    });
  }
}

class StudyRoom extends App {
  constructor(name, host, port) {
    super(name, host, port, jobEexcutor);
  }
}

module.exports = StudyRoom;
