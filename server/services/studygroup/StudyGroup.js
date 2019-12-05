const App = require("../../lib/tcp/App");
const { makePacket } = require("../../lib/tcp/util");
const StudyGroups = require("./models/StudyGroups");
const { pushStudyGroups } = require("../../lib/redis");

class StudyGroup extends App {
  constructor(name, host, port) {
    super(name, host, port);
  }
  async onRead(socket, data) {
    const { params, query, key } = data;
    let packet;

    switch (query) {
      case "addGroup":
        try {
          const groupInfo = params.payload;

          groupInfo.members = [];
          groupInfo.now_personnel = 1;
          groupInfo.days = groupInfo.selectedDays;
          groupInfo.location = { lat: 41.12, lon: -50.34 };

          await StudyGroups.create(params.payload);

          groupInfo.leader = groupInfo.leader.name;

          delete groupInfo.selectedDays;

          // const testGroups = [
          //   { "title": "오늘도 코딩 스터디", "leader": "리더일", "members": [{ "email": "sdkf@naver.com" }, { "email": "sjdklf@kakao.com" }], "min_personnel": 2, "max_personnel": 6, "isRecruiting": true, "intro": "일주일에 3번 만나 모각코 합니다", "thumbnail": "으쌰으쌰", "location": { "lat": 41.12, "lon": -71.34 }, "tags": ["자바", "파이썬" ] },
          //   { "title": "어제도 코딩 스터디", "leader": "리더삼", "members": [{ "email": "sdzxckf@naver.com" }, { "email": "sjdkqweqwelf@kakao.com" }], "min_personnel": 4, "max_personnel": 9, "isRecruiting": true, "intro": "매일매일 만나고 싶지만 일주일에 한 번", "thumbnail": "고고고", "location": { "lat": 41.12, "lon": -50.34 }, "tags": [ "GO" ] }
          // ]

          await pushStudyGroups(groupInfo);

          packet = makePacket(
            "REPLY",
            query,
            {},
            { href: "/" },
            key,
            this.context
          );
        } catch (e) {
          console.error(e);
          packet = makePacket("ERROR", query, {}, {}, key, this.context);
        }
        break;

      default:
        break;
    }

    this.send(socket, packet);
  }
  send(socket, packet) {
    socket.write(packet);
  }
}

module.exports = StudyGroup;
