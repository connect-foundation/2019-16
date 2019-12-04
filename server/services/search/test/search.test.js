const { searchAllStudyGroup, searchStudyGroupWithCategory } = require("../elasticsearch")

/**
 * searchStudyGroupWithCategory test
 */
test("searchStudyGroupWithCategory Test", async () => {
  const testGroups = [{ "title": "어제도 코딩 스터디", "subtitle": "언젠간GO를 마스터 할 날이 오겠죠", "leader": "리더삼", "members": [{ "email": "sdzxckf@naver.com" }, { "email": "sjdkqweqwelf@kakao.com" }], "min_personnel": 4, "now_personnel": 7, "max_personnel": 9, "startTime": 13, "during": 2, "days": [4, 5], "isRecruiting": true, "description": "매일매일 만나고 싶지만 일주일에 한 번", "thumbnail": "http://images.christiantoday.co.kr/data/images/full/323947/2.jpg?w=654", "location": { "lat": 41.12, "lon": -50.34 }, "category": ["프로그래밍", "JavaScript"], "tags": ["GO"] }]


  const result = await searchStudyGroupWithCategory({ searchWord: "코딩", category: "프로그래밍", lat: 41.0, lon: -50.34, isRecruit: true });

  expect(testGroups).toEqual(result);
})

