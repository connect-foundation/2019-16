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

  if (sameRoomIdInPayQueue.length === 0) {
    // 동일한 스터디 룸에 대해서 어떠한 결제도 진행중이 아니라면
    payQueue[roomId].push({
      day,
      startTime,
      endTime,
      userId
    });

    return await getNextUrl(kakaoAccessToken, paymentInfo);
  }

  if (
    avoidReservationCollision({ day, startTime, endTime }, sameRoomIdInPayQueue)
  ) {
    // 날짜가 겹치지 않는다면
    payQueue[roomId].push({
      day,
      startTime,
      endTime,
      userId
    });

    return await getNextUrl(kakaoAccessToken, paymentInfo);
  }
};
