const App = require("../../lib/tcp/App");
const StudyRooms = require("./models/studyrooms");

class StudyRoom extends App {
  constructor(name, host, port) {
    super(name, host, port);
  }

  async onRead(socket, data) {
    const { method, params, curQuery, endQuery, key } = data;

    this.tcpLogSender(curQuery);

    if (method === "GET" && curQuery === "availableRooms") {
      const filteredRooms = await StudyRooms.find({
        max_personnel: {
          $gte: 5
        },
        min_personnel: {
          $lte: 5
        },
        location: {
          $geoWithin: {
            $centerSphere: [[127.029975, 37.494179], 0.00031357300763550273]
          }
        },
        open_time: {
          $lte: 20
        },
        close_time: {
          $gte: 22
        }
      });

      this.send(socket, {
        method: "REPLY",
        curQuery,
        endQuery,
        params: {},
        body: { ...filteredRooms },
        key
      });
    }
  }
}

module.exports = StudyRoom;
