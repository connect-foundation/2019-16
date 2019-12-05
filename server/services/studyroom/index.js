require("dotenv").config();
const StudyRoom = require("./StudyRoom");

const { STUDYROOM_NAME, STUDYROOM_HOST, STUDYROOM_PORT } = process.env;
const studyRoom = new StudyRoom(STUDYROOM_NAME, STUDYROOM_HOST, STUDYROOM_PORT);

studyRoom.connectToAppListManager();
studyRoom.connectToLogService();
