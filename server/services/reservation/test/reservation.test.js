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
  _id: "studygroup1",
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
    lat: 50,
    lon: 120
  },
  category: ["testCategory"],
  tags: ["tag"],
  days: [0, 3],
  startTime: 18,
  endTime: 20
};

const studyRoom = {
  _id: "studyroom1",
  partner_id: "partenrer",
  cafe_name: "testCafe",
  name: "testName",
  location: [120, 50],
  images: ["testImage"],
  price: 20000,
  min_personnel: 1,
  max_personnel: 6,
  description: "testDescription",
  open_time: 10,
  close_time: 22
};

const studyRoom2 = {
  _id: "studyroom2",
  partner_id: "partenrer",
  cafe_name: "testCafe",
  name: "testName",
  location: [120, 50],
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
    id: "reservation1",
    studyGroup,
    studyRoom,
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
    id: "reservation2",
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
  await Reservations.deleteMany({ _id: "reservation1" });
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
  const studyGroup = {
    _id: "studygroup1",
    dates: {
      date: [new Date("2019-12-17"), new Date("2019-12-18")],
      start: 15,
      end: 16
    }
  };
  const studyRooms = [
    {
      _id: "studyroom1",
      partner_id: "partenrer",
      cafe_name: "testCafe",
      name: "testName",
      location: [120, 50],
      images: "testImage",
      price: 20000,
      min_personnel: 1,
      max_personnel: 6,
      description: "testDescription",
      open_time: 10,
      close_time: 22
    },
    {
      _id: "studyroom2",
      partner_id: "partenrer",
      cafe_name: "testCafe",
      name: "testName",
      location: [120, 50],
      images: "testImage",
      price: 20000,
      min_personnel: 1,
      max_personnel: 6,
      description: "testDescription",
      open_time: 10,
      close_time: 22
    }
  ];
  const result = await filterStudyGroup(studyGroup, studyRooms);

  expect(result).toEqual([studyRooms[1]]);
});

test("filterStudyGroup Test2", async () => {
  const studyGroup = {
    _id: "studygroup1",
    dates: {
      date: [new Date("2019-12-17"), new Date("2019-12-18")],
      start: 16,
      end: 18
    }
  };
  const studyRooms = [
    {
      _id: "studyroom1",
      partner_id: "partenrer",
      cafe_name: "testCafe",
      name: "testName",
      location: [120, 50],
      images: "testImage",
      price: 20000,
      min_personnel: 1,
      max_personnel: 6,
      description: "testDescription",
      open_time: 10,
      close_time: 22
    },
    {
      _id: "studyroom2",
      partner_id: "partenrer",
      cafe_name: "testCafe",
      name: "testName",
      location: [120, 50],
      images: "testImage",
      price: 20000,
      min_personnel: 1,
      max_personnel: 6,
      description: "testDescription",
      open_time: 10,
      close_time: 22
    }
  ];
  const result = await filterStudyGroup(studyGroup, studyRooms);

  expect(result).toEqual([studyRooms[1]]);
});
test("filterStudyGroup Test3", async () => {
  const studyGroup = {
    _id: "studygroup1",
    dates: {
      date: [new Date("2019-12-17"), new Date("2019-12-18")],
      start: 14,
      end: 18
    }
  };
  const studyRooms = [
    {
      _id: "studyroom1",
      partner_id: "partenrer",
      cafe_name: "testCafe",
      name: "testName",
      location: [120, 50],
      images: "testImage",
      price: 20000,
      min_personnel: 1,
      max_personnel: 6,
      description: "testDescription",
      open_time: 10,
      close_time: 22
    },
    {
      _id: "studyroom2",
      partner_id: "partenrer",
      cafe_name: "testCafe",
      name: "testName",
      location: [120, 50],
      images: "testImage",
      price: 20000,
      min_personnel: 1,
      max_personnel: 6,
      description: "testDescription",
      open_time: 10,
      close_time: 22
    }
  ];
  const result = await filterStudyGroup(studyGroup, studyRooms);

  expect(result).toEqual([studyRooms[1]]);
});
test("filterStudyGroup Test", async () => {
  const studyGroup = {
    _id: "studygroup1",
    dates: {
      date: [new Date("2019-12-17"), new Date("2019-12-18")],
      start: 21,
      end: 22
    }
  };
  const studyRooms = [
    {
      _id: "studyroom1",
      partner_id: "partenrer",
      cafe_name: "testCafe",
      name: "testName",
      location: [120, 50],
      images: "testImage",
      price: 20000,
      min_personnel: 1,
      max_personnel: 6,
      description: "testDescription",
      open_time: 10,
      close_time: 22
    },
    {
      _id: "studyroom2",
      partner_id: "partenrer",
      cafe_name: "testCafe",
      name: "testName",
      location: [120, 50],
      images: "testImage",
      price: 20000,
      min_personnel: 1,
      max_personnel: 6,
      description: "testDescription",
      open_time: 10,
      close_time: 22
    }
  ];
  const result = await filterStudyGroup(studyGroup, studyRooms);

  expect(result).toEqual([studyRooms[1]]);
});

test("filterStudyGroup Test", async () => {
  const studyGroup = {
    _id: "studygroup1",
    dates: {
      date: [new Date("2019-12-17"), new Date("2019-12-20")],
      start: 16,
      end: 18
    }
  };
  const studyRooms = [
    {
      _id: "studyroom1",
      partner_id: "partenrer",
      cafe_name: "testCafe",
      name: "testName",
      location: [120, 50],
      images: "testImage",
      price: 20000,
      min_personnel: 1,
      max_personnel: 6,
      description: "testDescription",
      open_time: 10,
      close_time: 22
    },
    {
      _id: "studyroom2",
      partner_id: "partenrer",
      cafe_name: "testCafe",
      name: "testName",
      location: [120, 50],
      images: "testImage",
      price: 20000,
      min_personnel: 1,
      max_personnel: 6,
      description: "testDescription",
      open_time: 10,
      close_time: 22
    }
  ];
  const result = await filterStudyGroup(studyGroup, studyRooms);

  expect(result).toEqual([]);
});
