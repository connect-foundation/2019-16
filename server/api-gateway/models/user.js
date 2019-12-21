const mongoose = require("mongoose");
const { Schema } = mongoose;
const { StudyGroupSchema } = require("./studygroup");

const UserSchema = new Schema({
  userId: String,
  userEmail: String,
  userGender: String,
  userAgeRange: Number,
  userName: String,
  kakaoAccessToken: String,
  profileImage: String,
  userLocation: { lat: Number, lon: Number },
  history: [StudyGroupSchema],
  ownGroups: [StudyGroupSchema],
  joiningGroups: [StudyGroupSchema]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
