const client = require("../elastic/client");

const {
  suggestQueries,
  updateQueriesValue,
  addFirstQuery,
  getQueryCount
} = require("../elastic/suggestion");

const testQuries = [
  {
    query: "자바",
    count: 1,
    value: 1
  },
  {
    query: "자바스크립트",
    count: 1,
    value: 0
  }
];

const initializeElastic = async () => {
  await client.index({
    index: "suggestedquery",
    id: 0,
    type: "_doc",
    body: testQuries[0]
  });
  await client.index({
    index: "suggestedquery",
    id: 1,
    type: "_doc",
    body: testQuries[1]
  });
};
const clearElastic = async () => {
  await client.delete({ index: "suggestedquery", id: 0 });
  await client.delete({ index: "suggestedquery", id: 1 });
};

beforeAll(async () => {
  // await initializeElastic();
});

afterAll(async () => {
  // await clearElastic();
});

/**
 * suggestQueries
 */
test("suggestQueries Test", async () => {
  const result = await suggestQueries({
    searchWord: "자바"
  });
  const result_exeptId = result.map(res => {
    delete res._id;
    return res;
  });

  console.log(result_exeptId);
  expect(result_exeptId).toEqual(testQuries);
});
