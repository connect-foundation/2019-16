require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");

const { RESERVATIONS_MONGO_URL } = process.env;

mongoose
  .connect(RESERVATIONS_MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Rservation mongoDB is connected");
  })
  .catch(err => {
    console.log("Rservation mongoDB connection fail", err);
  });
const Reservations = require("../model/reservations");
const { filterStudyGroup } = require("../query/queries");

const studyGroup = {
  _id: "5dec901744df7f249cdcbc2a",
  title: "testTitle",
  subtitle: "testSubTitle",
  leader: "testLeader",
  members: [
    {
      email: "test@naver.com",
      name: "name1"
    }
  ],
  min_personnel: 2,
  now_personnel: 1,
  max_personnel: 8,
  isRecruiting: true,
  intro: "test Intro",
  thumbnail: "test thumbnail",
  location: {
    type: "Point",
    coordinates: [127.02510622872565, 37.500994534216495]
  },
  category: ["testCategory"],
  tags: ["tag"],
  days: [0, 3],
  startTime: 18,
  endTime: 20
};

const studyRoom = {
  _id: "5dec9a47d5199c05b4013407",
  partner_id: "5de7b74cc39a82426cdba280",
  cafe_name: "testCafe",
  name: "testName",
  location: {
    type: "Point",
    coordinates: [127.02510622872565, 37.500994534216495]
  },
  images: ["testImage"],
  price: 20000,
  min_personnel: 1,
  max_personnel: 6,
  description: "testDescription",
  open_time: 10,
  close_time: 22
};

const studyRoom2 = {
  _id: "5dec9abf13d3461378c7bc5b",
  partner_id: "5de7b74cc39a82426cdba280",
  cafe_name: "testCafe2",
  name: "testName2",
  location: {
    type: "Point",
    coordinates: [127.02510622872565, 37.500994534216495]
  },
  images: ["testImage"],
  price: 20000,
  min_personnel: 1,
  max_personnel: 6,
  description: "testDescription",
  open_time: 10,
  close_time: 22
};

const testReservations = [
  {
    _id: "5dee03953420ea1d33083b76",
    studyGroup: studyGroup,
    studyRoom: studyRoom,
    dates: [
      {
        reservedDate: new Date("2019-12-17"),
        start: 15,
        end: 17
      },
      {
        reservedDate: new Date("2019-12-17"),
        start: 20,
        end: 23
      },
      {
        reservedDate: new Date("2019-12-20"),
        start: 16,
        end: 18
      },
      {
        reservedDate: new Date("2019-12-23"),
        start: 16,
        end: 18
      }
    ]
  },
  {
    _id: "5ded188883acd438ac226bdd",
    studyGroup: studyGroup,
    studyRoom: studyRoom2,
    dates: [
      {
        reservedDate: new Date("2019-12-20"),
        start: 16,
        end: 18
      },
      {
        reservedDate: new Date("2019-12-23"),
        start: 16,
        end: 18
      }
    ]
  }
];

const initializeDb = async () => {
  await Reservations.insertMany(testReservations);
};
const clearDb = async () => {
  await Reservations.deleteOne({ _id: testReservations[0]._id });
  await Reservations.deleteOne({ _id: testReservations[1]._id });
  await mongoose.disconnect();
};

beforeAll(async () => {
  return await initializeDb();
});

afterAll(async () => {
  return await clearDb();
});

/**
 * filterStudyGroup
 */
test("filterStudyGroup Test1", async () => {
  const _studyGroup = {
    _id: studyGroup._id,
    dates: {
      date: [new Date("2019-12-17"), new Date("2019-12-18")],
      start: 15,
      end: 16
    }
  };
  const studyRooms = [studyRoom, studyRoom2];
  const result = await filterStudyGroup(_studyGroup, studyRooms);
  expect(result).toEqual([studyRooms[1]]);
});

test("filterStudyGroup Test2", async () => {
  const _studyGroup = {
    _id: studyGroup._id,
    dates: {
      date: [new Date("2019-12-17"), new Date("2019-12-18")],
      start: 16,
      end: 18
    }
  };
  const studyRooms = [studyRoom, studyRoom2];
  const result = await filterStudyGroup(_studyGroup, studyRooms);

  expect(result).toEqual([studyRooms[1]]);
});
test("filterStudyGroup Test3", async () => {
  const _studyGroup = {
    _id: studyGroup._id,
    dates: {
      date: [new Date("2019-12-17"), new Date("2019-12-18")],
      start: 14,
      end: 18
    }
  };
  const studyRooms = [studyRoom, studyRoom2];
  const result = await filterStudyGroup(_studyGroup, studyRooms);

  expect(result).toEqual([studyRooms[1]]);
});
test("filterStudyGroup Test", async () => {
  const _studyGroup = {
    _id: studyGroup._id,
    dates: {
      date: [new Date("2019-12-17"), new Date("2019-12-18")],
      start: 21,
      end: 22
    }
  };
  const studyRooms = [studyRoom, studyRoom2];
  const result = await filterStudyGroup(_studyGroup, studyRooms);

  expect(result).toEqual([studyRooms[1]]);
});

test("filterStudyGroup Test4", async () => {
  const _studyGroup = {
    _id: studyGroup._id,
    dates: {
      date: [new Date("2019-12-17"), new Date("2019-12-20")],
      start: 16,
      end: 18
    }
  };
  const studyRooms = [studyRoom, studyRoom2];
  const result = await filterStudyGroup(_studyGroup, studyRooms);

  expect(result).toEqual([]);
});
