require("dotenv").config();
const StudyRoom = require("./StudyRoom");
const mongoose = require("mongoose");

const {
  STUDYROOMS_MONGO_URL,
  STUDYROOM_NAME,
  STUDYROOM_HOST,
  STUDYROOM_PORT
} = process.env;

mongoose
  .connect(STUDYROOMS_MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("StudyRoom mongoDB is connected");
  })
  .catch(err => {
    console.log("StudyRoom mongoDB connection fail", err);
  });

const studyRoom = new StudyRoom(STUDYROOM_NAME, STUDYROOM_HOST, STUDYROOM_PORT);

studyRoom.connectToAppListManager();
