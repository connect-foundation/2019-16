const { Types, Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true }
});

exports.schema = UserSchema;
exports.model = model("User", UserSchema);
