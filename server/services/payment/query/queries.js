const { avoidReservationCollision, getNextUrl } = require(".//util");
const payQueue = {};

function getElementsHaveSameRoomId(roomId) {
  if (!payQueue[roomId]) {
    payQueue[roomId] = [];

    return [];
  }

  return payQueue[roomId];
}

exports.inspectQueue = async ({ userId, paymentInfo, reservationInfo }) => {
  const { roomId, day, startTime, endTime } = reservationInfo;
  const sameRoomIdInPayQueue = getElementsHaveSameRoomId(roomId);
  let nextUrl = "";

  if (
    sameRoomIdInPayQueue.length === 0 ||
    avoidReservationCollision({ day, startTime, endTime }, sameRoomIdInPayQueue)
  ) {
    nextUrl = await getNextUrl(roomId, userId, paymentInfo);

    if (nextUrl) {
      payQueue[roomId].push({
        reservationInfo,
        paymentInfo,
        userId
      });
    }
  }

  return {
    headers: {
      method: "REPLY",
      curQuery: "inspectQueue",
      nextQuery: "gateway",
      endQuery: "inspectQueue",
      params: {}
    },
    body: { nextUrl }
  };
};
