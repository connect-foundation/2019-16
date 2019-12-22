const Reservations = require("../model/reservations");

exports.filterStudyGroup = async ({ studyGroup, studyRooms }) => {
  const orArray = studyGroup.dates.reduce((acc, date) => {
    acc.push({
      dates: {
        $elemMatch: {
          start: {
            $lt: date.end
          },
          end: {
            $gt: date.start
          },
          reservedDate: new Date(date.date)
        }
      }
    });

    return acc;
  }, []);

  const query = { $or: orArray };

  const reservatedInfo = await Reservations.find(query);

  const reservatedId = reservatedInfo.map(info => info.studyRoom.id);
  const filterdRooms = studyRooms.filter(
    room => !reservatedId.includes(room._id)
  );

  return {
    headers: {
      method: "REPLY",
      curQuery: "filterStudyGroup",
      nextQuery: "apigateway",
      params: {}
    },
    body: filterdRooms.slice(0, 100)
  };
};

exports.addReservation = async ({ reservationInfo, userId }) => {
  // 데이터베이스에 저장

  return {
    headers: {
      method: "REPLY",
      curQuery: "addReservation",
      nextQuery: "removeInQueue",
      params: { roomId: reservationInfo.roomId, userId }
    },
    body: {}
  };
};
