const mongoose = require("mongoose");
const { Schema } = mongoose;
StudyRoomSchema = new Schema(
  {
    partner_id: String,
    cafe_name: String,
    name: String,
    location: {
      type: {
        type: String,
        enum: ["Point"]
      },
      coordinates: {
        type: [Number]
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
