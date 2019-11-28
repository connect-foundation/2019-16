require("dotenv").config();
const { MONGO_URL } = process.env;
const { APP_NAME, HOST, PORT } = process.env;
const StudyGroup = require("./StudyGroup");
const mongoose = require("mongoose");
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((err, result) => {});

const studyGroup = new StudyGroup(APP_NAME, HOST, PORT);

studyGroup.connectToAppListManager();
