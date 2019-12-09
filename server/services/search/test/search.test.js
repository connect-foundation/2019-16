require("dotenv").config({ path: "../../.env" });
const { SEARCH_ELASTIC_HOST, SEARCH_ELASTIC_PORT } = process.env;
// const SEARCH_ELASTIC_HOST = "106.10.41.25";
// const SEARCH_ELASTIC_PORT = 9200;

const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: `http://${SEARCH_ELASTIC_HOST}:${SEARCH_ELASTIC_PORT}`
});

const {
  searchStudyGroup,
  searchStudyGroupWithCategory,
  tagStudyGroup,
  searchAllStudyGroup,
  searchAllStudyGroupWithCategory,
  bulkStudyGroups
} = require("../elasticsearch");

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

const String_testGroups = [
  `{"_id":"1", "title": "test", "subtitle": "subtitle1", "intro" : "intro1", "isRecruiting" : true, "category" : [ "프로그래밍", "파이썬"] , "tags" : ["알고리즘 ","파이썬 ","python ","algorithm"],"days" : [0, 4], "leader" : "test1@gmail.com", "startTime" : 17, "min_personnel" : 4, "max_personnel" : 8, "location" : { "lat" : 41.12, "lon" : -50.34 },"endTime" : 19,"thumbnail" : "https://kr.object.ncloudstorage.com/studycombined/groupImage/1575602565910algorith.png","members" : [ ]}`,
  `{"_id":"2", "title": "test", "subtitle": "subtitle2", "intro" : "intro2", "isRecruiting" : true, "category" : [ "프로그래밍", "자바"], "tags" : ["알고리즘 ","java ","자바 ","algorithm"],"days" : [0, 4], "leader" : "test1@gmail.com", "startTime" : 17, "min_personnel" : 4, "max_personnel" : 8, "location" : { "lat" : 41.12, "lon" : -50.34 },"endTime" : 19,"thumbnail" : "https://kr.object.ncloudstorage.com/studycombined/groupImage/1575602565910algorith.png","members" : [ ]}`
];

const initializeElastic = async () => {
  await bulkStudyGroups(String_testGroups);
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

jest.setTimeout(30000);
