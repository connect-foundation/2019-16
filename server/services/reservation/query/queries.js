const Reservations = require("../model/reservations");

exports.filterStudyGroup = async (studyGroup, studyRooms) => {
  const reservatedInfo = await Reservations.find()
    .where("dates.reservedDate")
    .in(studyGroup.dates.date)
    .or([
      {
        "dates.start": { $lte: studyGroup.dates.start },
        "dates.start": { $gte: studyGroup.dates.end }
      },
      {
        "dates.end": { $lte: studyGroup.dates.start },
        "dates.end": { $gte: studyGroup.dates.end }
      },
      {
        "dates.start": {
          $lte: studyGroup.dates.start,
          $lte: studyGroup.dates.end
        },
        "dates.end": {
          $gte: studyGroup.dates.start,
          $gte: studyGroup.dates.end
        }
      }
    ]);
  const reservatedId = reservatedInfo.map(info => info.studyRoom.id);
  const filterdRooms = studyRooms.filter(
    room => !reservatedId.includes(room._id)
  );
  return filterdRooms;
};
