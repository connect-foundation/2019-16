const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true }
});

const GroupSchema = new Schema(
  {
    group_id: { type: String },
    title: { type: String },
    subtitle: { type: String },
    leader: { type: String },
    members: [UserSchema],
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

module.exports = model("StudyGroup", GroupSchema);
