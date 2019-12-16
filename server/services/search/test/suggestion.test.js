const client = require("../elastic/client");

const {
  suggestQueries,
  updateQueriesValue,
  addFirstQuery
} = require("../elastic/suggestion");

const testQuries = [
  {
    query: "자바",
    count: 0,
    value: 0
  },
  {
    query: "자바스크립트",
    count: 0,
    value: 0
  }
];

// const initializeElastic = async () => {
//   // await client.index({
//   //   index: "suggesttest",
//   //   type: "_doc",
//   //   body: testQuries[0]
//   // });
//   // await client.index({
//   //   index: "suggesttest",
//   //   type: "_doc",
//   //   body: testQuries[1]
//   // });
// };
// const clearElastic = async () => {
//   // await client.delete({ index: "suggesttest", id: 1 });
//   // await client.delete({ index: "suggesttest", id: 2 });
// };

// beforeAll(async () => {
//   return await initializeElastic();
// });

// afterAll(async () => {
//   return await clearElastic();
// });

// /**
//  * suggestQueries
//  */
// test("suggestQueries Test", async () => {
//   const result = await suggestQueries({
//     searchWord: "자바"
//   });

//   expect(result).toEqual([testQuries[1], testQuries[0]]);
// });

// addFirstQuery({ searchWord: "파이썬" }).then(res => {
//   console.log(res);
// });
