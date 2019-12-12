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

  return filterdRooms;
};
