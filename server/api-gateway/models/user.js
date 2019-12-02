const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: String,
    gender: String,
    ageRange: Number,
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
