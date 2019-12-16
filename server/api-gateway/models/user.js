const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    userId: String,
    userEmail: String,
    userGender: String,
    userAgeRange: Number,
    userName: String,
    kakaoAccessToken: String,
    profileImage: String,
    userLocation: { lat: Number, lon: Number },
    history: [mongoose.Types.ObjectId],
    ownGroups: [mongoose.Types.ObjectId],
    partipatedGroups: [mongoose.Types.ObjectId]
  },
  {
    collection: "user"
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
