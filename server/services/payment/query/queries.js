const { avoidReservationCollision, getNextUrl } = require(".//util");
const payQueue = {};

function getElementsHaveSameRoomId(roomId) {
  if (!payQueue[roomId]) {
    payQueue[roomId] = [];

    return [];
  }

  return payQueue[roomId];
}

exports.inspectQueue = async ({ userInfo, paymentInfo, reservationInfo }) => {
  const { userId, kakaoAccessToken } = userInfo;
  const { roomId, day, startTime, endTime } = reservationInfo;
  const sameRoomIdInPayQueue = getElementsHaveSameRoomId(roomId);
  let nextUrl = "";

  if (
    sameRoomIdInPayQueue.length === 0 ||
    avoidReservationCollision({ day, startTime, endTime }, sameRoomIdInPayQueue)
  ) {
    nextUrl = await getNextUrl(kakaoAccessToken, paymentInfo);

    if (nextUrl) {
      payQueue[roomId].push({
        day,
        startTime,
        endTime,
        userId
      });
    }
  }

  return { nextUrl };
};
