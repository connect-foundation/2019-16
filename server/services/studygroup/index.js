const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "/../../.env") });
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

studyGroup.connectToAppListManager();

let tryConnect = setInterval(() => {
  connectToService.bind(studyGroup)("user");
}, 1000);
