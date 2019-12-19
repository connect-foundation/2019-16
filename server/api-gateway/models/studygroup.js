const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String },
  name: { type: String }
});

exports.StudyGroupSchema = new Schema(
  {
    title: { type: String },
    subtitle: { type: String },
    leader: { type: String },
    members: { type: [UserSchema] },
    min_personnel: { type: Number },
    now_personnel: { type: Number },
    max_personnel: { type: Number },
    isRecruiting: { type: Boolean },
    intro: { type: String },
    thumbnail: { type: String },
    location: {
      lat: { type: Number },
      lon: { type: Number }
    },
    category: { type: [String] },
    tags: { type: [String] },
    days: { type: [Number] },
    startTime: { type: Number },
    endTime: { type: Number }
  },
  { _id: false }
);
