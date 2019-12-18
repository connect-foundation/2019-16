const { getQueueByUserId } = require("../query/util");

const payQueue = {
  "1234": [
    {
      userId: "8493902",
      reservationInfo: {
        day: [1, 2, 3],
        startTime: [1, 2, 3],
        endTime: [2, 3, 4],
        roomId: "1234"
      }
    },
    {
      userId: "9493738",
      reservationInfo: {
        day: [1, 2, 3],
        startTime: [1, 2, 3],
        endTime: [2, 3, 4],
        roomId: "1234"
      }
    }
  ],
  "4431": [
    {
      userId: "8493902",
      reservationInfo: {
        day: [1, 2, 3],
        startTime: [1, 2, 3],
        endTime: [2, 3, 4],
        roomId: "4431"
      }
    },
    {
      userId: "8493903",
      reservationInfo: {
        day: [1, 2, 3],
        startTime: [1, 2, 3],
        endTime: [2, 3, 4],
        roomId: "4431"
      }
    }
  ]
};

test("스터디룸 1234번에서 사용자 8493902의 결제 정보 반환", () => {
  const queue = getQueueByUserId(payQueue["1234"], "8493902")[0];
  expect(queue.reservationInfo).toEqual({
    day: [1, 2, 3],
    startTime: [1, 2, 3],
    endTime: [2, 3, 4],
    roomId: "1234"
  });
});

test("스터디룸 4431번의 사용자 8493903의 결제 정보 반환", () => {
  const queue = getQueueByUserId(payQueue["4431"], "8493903")[0];
  expect(queue.reservationInfo).toEqual({
    day: [1, 2, 3],
    startTime: [1, 2, 3],
    endTime: [2, 3, 4],
    roomId: "4431"
  });
});
