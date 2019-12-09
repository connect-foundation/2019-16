const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudyRoomsSchema = new Schema(
  {
    partner_id: { type: String, required: true },
    cafe_name: String,
    name: String,
    // location: {
    //   type: String,
    //   coordinates: [Number]
    // },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    images: [String],
    price: Number,
    min_personnel: Number,
    max_personnel: Number,
    description: String,
    open_time: Number,
    close_time: Number
  },
  {
    collection: "studyrooms"
  }
);

const StudyRooms = mongoose.model("studyrooms", StudyRoomsSchema);

module.exports = StudyRooms;
