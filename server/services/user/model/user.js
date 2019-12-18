const { Schema, model } = require("mongoose");
const StudyGroup = require("./studygroup").schema;

const UserSchema = new Schema({
  userId: String,
  userEmail: String,
  ownGroups: [StudyGroup],
  joiningGroups: [StudyGroup]
});

module.exports = model("User", UserSchema);
