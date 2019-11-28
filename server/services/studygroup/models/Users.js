const { Types, Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, required: true },
  gender: { type: String },
  ageRange: { type: Number },
  history: { type: [Types.ObjectId] },
  ownGroups: { type: [Types.ObjectId] },
  partipatedGroups: { type: [Types.ObjectId] },
  name: { type: String, required: true }
});

exports.schema = UserSchema;
exports.model = model("User", UserSchema);
