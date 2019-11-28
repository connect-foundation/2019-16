const { Schema, model, Types } = require("mongoose");
const User = require("./Users").schema;

const GroupSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  leader: { type: User, required: true },
  members: { type: [User] },
  min_personnel: { type: Number, required: true },
  max_personnel: { type: Number, required: true },
  isRecruiting: { type: Boolean, default: true },
  intro: { type: String },
  thumbnail: { type: String },
  location: {
    lat: { type: Number },
    lon: { type: Number }
  },
  category: { type: [String] },
  tags: { type: [String] },
  selectedDays: { type: [Number] },
  startTime: { type: Number },
  during: { type: Number }
});

module.exports = model("StudyGroup", GroupSchema);
