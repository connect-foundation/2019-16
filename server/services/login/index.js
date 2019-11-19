const TcpServer = require("../../lib/tcp/tcpServer");
const mongoose = require("mongoose");
const { makePacket } = require("../../lib/tcp/util");
const User = require("./models/user");
const JWT = require("jsonwebtoken");

const PACKET_SPLITTER = "|";

const generateToken = (payload, secretKey, options) => {
  return new Promise((resolve, reject) => {
    JWT.sign(payload, secretKey, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

class UserServer extends TcpServer {
  constructor() {
    super("user", "127.0.0.1", 8081, "login");
  }

  async onRead(socket, data) {
    let payload = {};
    let packet = {};

    try {
      const { email, password } = data.params;
      const userInfo = await User.findOne({ email });
      const { age } = userInfo;

      if (!userInfo || userInfo.password !== password) {
        payload = null;
        return;
      }
      payload = { email, age };
      const options = {
        expiresIn: "7d",
        subject: "userInfo"
      };
      const token = await generateToken(payload, "1q2w3e4r!", options);

      payload.jwt = token;
      packet = makePacket("REPLY", "apigateway", {}, payload, this.context);
    } catch (e) {
      console.error(e);
      packet = makePacket(
        "ERROR",
        "apigateway",
        {},
        { error: e },
        this.context
      );
    } finally {
      socket.write(packet);
    }
  }
}

mongoose
  .connect("mongodb://106.10.42.155:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(e => {
    console.error(e);
  });

const userServer = new UserServer();

userServer.connectToDistributor();
