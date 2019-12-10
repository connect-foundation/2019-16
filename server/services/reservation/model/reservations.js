const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudyGroupSchema = require("./studygroup");
const StudyRoomSchema = require("./studyroom");

const ReservationsSchema = new Schema({
  studyGroup: StudyGroupSchema,
  studyRoom: StudyRoomSchema,
  dates: [
    {
      reservedDate: Date,
      start: Number,
      end: Number
    }
  ]
});

const Reservations = mongoose.model("reservations", ReservationsSchema);

module.exports = Reservations;
