const { searchAllStudyGroupWithFiltering, searchStudyGroup, bulkStudyGroups } = require("../elasticsearch")

/**
 * bulkStudyGroups test
 */
test("bulkStudyGroups Test", async () => {
  const testGroups = [
    { "title": "오늘도 코딩 스터디", "leader": "리더일", "members": [{ "email": "sdkf@naver.com" }, { "email": "sjdklf@kakao.com" }], "min_personnel": 2, "max_personnel": 6, "isRecruit": true, "description": "일주일에 3번 만나 모각코 합니다", "thumbnail": "으쌰으쌰", "location": { "lat": 41.12, "lon": -71.34 }, "tags": [{ "tag": "자바" }, { "tag": "파이썬" }] },
    { "title": "어제도 코딩 스터디", "leader": "리더삼", "members": [{ "email": "sdzxckf@naver.com" }, { "email": "sjdkqweqwelf@kakao.com" }], "min_personnel": 4, "max_personnel": 9, "isRecruit": true, "description": "매일매일 만나고 싶지만 일주일에 한 번", "thumbnail": "고고고", "location": { "lat": 41.12, "lon": -50.34 }, "tags": [{ "tag": "GO" }] }
  ]

  await bulkStudyGroups(testGroups);
  const result = await searchAllStudyGroupWithFiltering({ isRecruit: true });

  expect(testGroups).toEqual(result);
})