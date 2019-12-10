const App = require("../../lib/tcp/App");
const StudyRooms = require("./models/studyrooms");

const convertKntoMile = km => {
  return km / 6378.1;
};
class StudyRoom extends App {
  constructor(name, host, port) {
    super(name, host, port);
  }

  async onRead(socket, data) {
    const { method, params, curQuery, endQuery, key } = data;

    const { geopoint, personnel, startTime, endTime, days } = params;

    if (method === "GET" && curQuery === "availableRooms") {
      const filteredRooms = await StudyRooms.find({
        max_personnel: {
          $gte: personnel
        },
        min_personnel: {
          $lte: personnel
        },
        location: {
          $geoWithin: {
            $centerSphere: [
              [geopoint.latitude, geopoint.longitude],
              convertKntoMile(1)
            ]
          }
        },
        open_time: {
          $lte: startTime
        },
        close_time: {
          $gte: endTime
        }
      });

      this.send(socket, {
        method: "REPLY",
        curQuery,
        endQuery,
        params: {},
        body: { filteredRooms },
        key
      });
    }
  }
}

module.exports = StudyRoom;
