const avoidReservationCollision = require("../../lib/avoidReservationCollision");
const payQueue = {};

/**
 * 같은 스터디룸에 대해 결제 중인 요청들
 * @param {String} roomId 스터디룸 id
 * @returns {Object[]}
 */
function getElementsHaveSameRoomId(roomId) {
  if (!payQueue[roomId]) {
    payQueue[roomId] = [];
    return [];
  }
  return payQueue[roomId];
}

function payQueueInspection(req, res, next) {
  const {
    roomId,
    day,
    startTime,
    endTime,
    buyerEmail
  } = req.body.reservationInfo;
  const sameRoomIdInPayQueue = getElementsHaveSameRoomId(roomId);

  if (sameRoomIdInPayQueue.length === 0) {
    // 동일한 스터디 룸에 대해서 어떠한 결제도 진행중이 아니라면
    payQueue[roomId].push({
      day,
      startTime,
      endTime,
      buyerEmail
    });
    next();
  }
  if (
    avoidReservationCollision({ day, startTime, endTime }, sameRoomIdInPayQueue)
  ) {
    // 날짜가 겹치지 않는다면
    payQueue[roomId].push({
      day,
      startTime,
      endTime,
      buyerEmail
    });
    next();
  }

  // res.json();
}

module.exports = payQueueInspection;
