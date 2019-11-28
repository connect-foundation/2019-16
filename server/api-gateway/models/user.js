const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: String,
    gender: String,
    ageRange: String,
    history: { type: [mongoose.Types.ObjectId], default: [] },
    ownGroups: { type: [mongoose.Types.ObjectId], default: [] },
    partipatedGroups: { type: [mongoose.Types.ObjectId], default: [] }
  },
  {
    collection: "user"
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
