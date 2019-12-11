const mongoose = require("mongoose");
const studyRoomsModel = require("../models/studyrooms");
const { queryResolver } = require("../queryResolver");

const mockPacket = {
  method: "GET",
  curQuery: "availableRooms",
  endQuery: "filterStudyGroup",
  params: {
    geopoint: { longitude: 127.021947, latitude: 37.503077 },
    personnel: 5,
    startTime: 20,
    endTime: 23,
    days: []
  },
  body: {},
  key: "",
  info: ""
};

describe("StudyRoom Model Test", () => {
  let connection;
  let db;

  beforeAll(async () => {
    await mongoose.connect(
      "mongodb://106.10.41.25:8105/StudyRooms",
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true
      },
      err => {
        console.log(err);
      }
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("availableRooms query working successfully", async () => {
    const result = await queryResolver(
      mockPacket.curQuery,
      mockPacket.params,
      studyRoomsModel
    );

    expect(result.method).toEqual("GET");
    expect(result.curQuery).toEqual("filterStudyGroup");
    expect(result.params.hasOwnProperty("filteredRooms")).toEqual(true);
  });

  test("If resolver get wrong query", async () => {
    try {
      const result = await queryResolver(
        "wrong",
        mockPacket.params,
        studyRoomsModel
      );
    } catch (e) {
      expect(e.message).toBe(
        "Query is not matched with studyRoom query resolver. Your query is wrong"
      );
    }
  });
});
