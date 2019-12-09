require("dotenv").config({ path: ".env" });
const {
  STUDYGROUPS_MONGO_URL,
  STUDYGROUP_NAME,
  STUDYGROUP_HOST,
  STUDYGROUP_PORT
} = process.env;
const StudyGroup = require("./StudyGroup");
const mongoose = require("mongoose");

mongoose
  .connect(STUDYGROUPS_MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((err, result) => {});

const studyGroup = new StudyGroup(
  STUDYGROUP_NAME,
  STUDYGROUP_HOST,
  STUDYGROUP_PORT
);

studyGroup.connectToAppListManager();
studyGroup.connectToLogService();
