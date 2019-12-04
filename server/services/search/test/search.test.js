const { searchAllStudyGroup, bulkStudyGroups } = require("../elasticsearch");

/**
 * searchAllStudyGroup test
 */
// test("searchAllStudyGroup Test", async () => {
//   const testGroups = [
//     {
//       _index: "studygroup",
//       _type: "_doc",
//       _id: "n4vftW4BY419Z4XnlPvY",
//       _score: 1.0,
//       _source: {
//         category: ["외국어", "영어"],
//         leader: "숩",
//         tags: ["토익 ", "스터디 ", "TOEIC "],
//         title: "토익 900 목표 스터디",
//         subtitle: "900이상을 위한 심화 스터디 진행합니다",
//         intro: `
// 토익 공부 같이해요!
// 800점대 분들 900점대로 올리기위한 심화 스터디로 진행 예정입니다.
// 카톡으로 항상 공부시간도 인증해요.
// `,
//         startTime: 0,
//         during: 2,
//         isRecruiting: true,
//         min_personnel: 0,
//         max_personnel: 0,
//         thumbnail:
//           "https://kr.object.ncloudstorage.com/studycombined/groupImage/1575009353771경찰공무원_가산점_2-5점까지_받을수_있는_토익.jpg",
//         members: [],
//         now_personnel: 1,
//         days: [4, 2],
//         location: {
//           lat: 41.12,
//           lon: -50.34
//         }
//       }
//     }
//   ];
//   const result = await searchAllStudyGroup({
//     lat: 41.0,
//     lon: -50.34,
//     isRecruit: true
//   });

//   console.log(result);
//   expect(testGroups).toEqual(result);
// });

searchAllStudyGroup({
  lat: 41.0,
  lon: -50.34,
  isRecruit: true
}).then(() => {});
