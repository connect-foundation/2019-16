const { avoidReservationCollision } = require("../query/util");

const myReservation = {
  day: [0, 4, 5],
  startTime: [10, 14, 18],
  endTime: [13, 17, 21]
};

const case1 = {
  reservationInfo: {
    day: [1, 2, 3],
    startTime: [10, 10, 10],
    endTime: [12, 12, 12]
  }
};

const case2 = {
  reservationInfo: {
    day: [0, 1, 2],
    startTime: [12, 14, 18],
    endTime: [14, 16, 20]
  }
};

const case3 = {
  reservationInfo: {
    day: [0, 4, 5],
    startTime: [13, 17, 21],
    endTime: [14, 18, 22]
  }
};

test("날짜가 하나도 겹치지 않을 때 True", () => {
  const result = avoidReservationCollision(myReservation, [case1]);

  expect(result).toBe(true);
});

test("첫날 한시간이 겹칠 때 False", () => {
  const result = avoidReservationCollision(myReservation, [case2]);

  expect(result).toBe(false);
});

test("날짜가 모두 겹쳐도 시간이 겹치지 않으면 True", () => {
  const result = avoidReservationCollision(myReservation, [case3]);

  expect(result).toBe(true);
});

test("case1 + case3 => true", () => {
  const result = avoidReservationCollision(myReservation, [case1, case3]);

  expect(result).toBe(true);
});

test("case2 + case3 => false", () => {
  const result = avoidReservationCollision(myReservation, [case2, case3]);

  expect(result).toBe(false);
});
