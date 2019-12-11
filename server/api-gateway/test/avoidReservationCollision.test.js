const avoidReservationCollision = require("../lib/avoidReservationCollision");
const case1 = {
  day: [3, 4, 5],
  startTime: [1, 2, 3],
  endTime: [3, 4, 5]
};
const case2 = {
  day: [4, 5, 6],
  startTime: [4, 5, 6],
  endTime: [6, 7, 8]
};
const case3 = {
  day: [2],
  startTime: [19],
  endTime: [22]
};
const case4 = {
  day: [3, 4],
  startTime: [19, 20],
  endTime: [20, 21]
};

test("날짜가 겹치지 않기 때문에 true", () => {
  const myReservationInfo = {
    day: [0, 1, 2],
    startTime: [20, 20, 20],
    endTime: [21, 21, 21]
  };
  const sameRoomIdInPayQueue = [];

  sameRoomIdInPayQueue.push(case1);
  sameRoomIdInPayQueue.push(case2);

  expect(
    avoidReservationCollision(myReservationInfo, sameRoomIdInPayQueue)
  ).toBe(true);
});

test("날짜가 겹치지만 시간이 겹치지 않으면 true", () => {
  const myReservationInfo = {
    day: [2, 3, 4],
    startTime: [20, 20, 20],
    endTime: [21, 21, 21]
  };
  const sameRoomIdInPayQueue = [];

  sameRoomIdInPayQueue.push(case1);
  sameRoomIdInPayQueue.push(case2);

  expect(
    avoidReservationCollision(myReservationInfo, sameRoomIdInPayQueue)
  ).toBe(true);
});

test("날짜와 시간이 하나라도 겹치면 false", () => {
  const myReservationInfo = {
    day: [2, 3, 4],
    startTime: [20, 20, 20],
    endTime: [21, 21, 21]
  };
  const sameRoomIdInPayQueue = [];

  sameRoomIdInPayQueue.push(case3);
  sameRoomIdInPayQueue.push(case4);

  expect(
    avoidReservationCollision(myReservationInfo, sameRoomIdInPayQueue)
  ).toBe(false);
});
