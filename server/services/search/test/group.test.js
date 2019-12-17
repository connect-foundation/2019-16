const client = require("../elastic/client");
const {
  searchStudyGroup,
  searchStudyGroupWithCategory,
  tagStudyGroup,
  searchAllStudyGroup,
  searchAllStudyGroupWithCategory,
  bulkStudyGroups
} = require("../elastic/group");

const testGroups = [
  {
    _id: "1",
    title: "test",
    subtitle: "subtitle1",
    intro: "intro1",
    isRecruiting: true,
    category: ["프로그래밍", "파이썬"],
    tags: ["알고리즘 ", "파이썬 ", "python ", "algorithm"],
    days: [0, 4],
    leader: "test1@gmail.com",
    startTime: 17,
    min_personnel: 4,
    max_personnel: 8,
    location: { lat: 41.12, lon: -50.34 },
    endTime: 19,
    thumbnail:
      "https://kr.object.ncloudstorage.com/studycombined/groupImage/1575602565910algorith.png",
    members: []
  },
  {
    _id: "2",
    title: "test",
    subtitle: "subtitle2",
    intro: "intro2",
    isRecruiting: true,
    category: ["프로그래밍", "자바"],
    tags: ["알고리즘 ", "java ", "자바 ", "algorithm"],
    days: [0, 4],
    leader: "test1@gmail.com",
    startTime: 17,
    min_personnel: 4,
    max_personnel: 8,
    location: { lat: 41.12, lon: -50.34 },
    endTime: 19,
    thumbnail:
      "https://kr.object.ncloudstorage.com/studycombined/groupImage/1575602565910algorith.png",
    members: []
  }
];

const ADD_testGroups = [
  `{"_id":"1", "title": "test", "subtitle": "subtitle1", "intro" : "intro1", "isRecruiting" : true, "category" : [ "프로그래밍", "파이썬"] , "tags" : ["알고리즘 ","파이썬 ","python ","algorithm"],"days" : [0, 4], "leader" : "test1@gmail.com", "startTime" : 17, "min_personnel" : 4, "max_personnel" : 8, "location" : { "lat" : 41.12, "lon" : -50.34 },"endTime" : 19,"thumbnail" : "https://kr.object.ncloudstorage.com/studycombined/groupImage/1575602565910algorith.png","members" : [ ]}`,
  `{"_id":"2", "title": "test", "subtitle": "subtitle2", "intro" : "intro2", "isRecruiting" : true, "category" : [ "프로그래밍", "자바"], "tags" : ["알고리즘 ","java ","자바 ","algorithm"],"days" : [0, 4], "leader" : "test1@gmail.com", "startTime" : 17, "min_personnel" : 4, "max_personnel" : 8, "location" : { "lat" : 41.12, "lon" : -50.34 },"endTime" : 19,"thumbnail" : "https://kr.object.ncloudstorage.com/studycombined/groupImage/1575602565910algorith.png","members" : [ ]}`
];

const UPDATE_testGroups = [
  `{"_id":"1", "title": "update", "subtitle": "update", "intro" : "update", "isRecruiting" : true, "category" : [ "프로그래밍", "파이썬"] , "tags" : ["알고리즘 ","파이썬 ","python ","algorithm"],"days" : [0, 4], "leader" : "test1@gmail.com", "startTime" : 17, "min_personnel" : 4, "max_personnel" : 8, "location" : { "lat" : 41.12, "lon" : -50.34 },"endTime" : 19,"thumbnail" : "https://kr.object.ncloudstorage.com/studycombined/groupImage/1575602565910algorith.png","members" : [ ]}`
];

const REMOVE_testGroups = [
  `{"_id":"2", "title": "test", "subtitle": "subtitle2", "intro" : "intro2", "isRecruiting" : true, "category" : [ "프로그래밍", "자바"], "tags" : ["알고리즘 ","java ","자바 ","algorithm"],"days" : [0, 4], "leader" : "test1@gmail.com", "startTime" : 17, "min_personnel" : 4, "max_personnel" : 8, "location" : { "lat" : 41.12, "lon" : -50.34 },"endTime" : 19,"thumbnail" : "https://kr.object.ncloudstorage.com/studycombined/groupImage/1575602565910algorith.png","members" : [ ]}`
];

const initializeElastic = async () => {
  await bulkStudyGroups(ADD_testGroups, [], []);
};
const clearElastic = async () => {
  await client.delete({ index: "test", id: 1 });
  await client.delete({ index: "test", id: 2 });
};

beforeAll(async () => {
  return await initializeElastic();
});

afterAll(async () => {
  return await clearElastic();
});

/**
 * searchStudyGroup
 */
test("searchStudyGroup Test", async () => {
  const result = await searchStudyGroup({
    searchWord: "test",
    lat: "41.12",
    lon: "-50.34",
    isRecruit: true
  });

  expect(result).toEqual([testGroups[1], testGroups[0]]);
});
/**
 * searchStudyGroupWithCategory
 */
test("searchStudyGroupWithCategory Test", async () => {
  const result = await searchStudyGroupWithCategory({
    searchWord: "test",
    category: "파이썬",
    lat: "41.12",
    lon: "-50.34",
    isRecruit: true
  });

  expect(result).toEqual([testGroups[0]]);
});
/**
 * tagStudyGroup
 */
test("tagStudyGroup Test", async () => {
  const result = await tagStudyGroup({
    tags: ["자바"],
    lat: "41.12",
    lon: "-50.34",
    isRecruit: true
  });

  expect(result).toEqual([testGroups[1]]);
});

/**
 * searchAllStudyGroup test
 */
test("searchAllStudyGroup Test", async () => {
  const result = await searchAllStudyGroup({
    lat: "41.12",
    lon: "-50.34",
    isRecruit: true
  });

  expect(result).toEqual([testGroups[1], testGroups[0]]);
});

/**
 * searchAllStudyGroupWithCategory
 */
test("searchAllStudyGroupWithCategory Test", async () => {
  const result = await searchAllStudyGroupWithCategory({
    category: "파이썬",
    lat: "41.12",
    lon: "-50.34",
    isRecruit: true
  });

  expect(result).toEqual([testGroups[0]]);
});

/**
 *
 */
