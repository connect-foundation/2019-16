const App = require("../../lib/tcp/App");
const { queryResolver } = require("./queryResolver");

async function jobEexcutor(_socket, data) {
  let socket = {};
  const { params, nextQuery } = data;
  let queryResult;

  try {
    queryResult = await queryResolver(nextQuery, params);
  } catch (error) {
    queryResult = { method: "ERROR", body: { error } };
  } finally {
    if (nextQuery === "availableRooms") {
      socket = this.appClients.reservation;
    }
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
