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

async function connectToService(name) {
  try {
    let isServiceConnected = false;
    const service = await this.connectToApp(
      name,
      () => {
        isServiceConnected = true;
        console.log(`${name} service connect`);
      },
      () => {},
      () => {
        isServiceConnected = false;
        console.log(`${name} service end`);
      },
      () => {
        isServiceConnected = false;
        console.log(`${name} service error`);
      }
    );

    setInterval(() => {
      if (!isServiceConnected) {
        console.log(`try connect to ${name}`);
        service.connect();
      }
    }, 2000);
    clearInterval(tryConnect);
  } catch (e) {
    console.log(e);
  }
}
const studyRoom = new StudyRoom(STUDYROOM_NAME, STUDYROOM_HOST, STUDYROOM_PORT);

studyRoom.connectToAppListManager();

let tryConnect = setInterval(() => {
  connectToService.bind(studyRoom)("reservation");
}, 1000);
