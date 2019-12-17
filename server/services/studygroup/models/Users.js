const { Types, Schema, model } = require("mongoose");

const UserSchema = new Schema({
  id: { type: String, required: true },
  email: { type: String },
  name: { type: String }
});

exports.schema = UserSchema;
exports.model = model("User", UserSchema);
