const App = require("../../lib/tcp/App");

class StudyRoom extends App {
  constructor(name, host, port) {
    super(name, host, port);
  }

  onRead(socket, data) {
    const { params, curQuery } = data;

    this.tcpLogSender(curQuery);
  }
}

module.exports = StudyRoom;
