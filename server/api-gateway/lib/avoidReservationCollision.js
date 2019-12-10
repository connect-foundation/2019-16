/**
 * 결제 요청이 들어온 정보의 날짜와 기존에 있는 큐와 충돌이 있는지 확인
 */
const avoidTimeCollision = weekTable => compareElement =>
  compareElement.day.every((d, idx) => {
    if (!weekTable[0][d]) return true;
    return (
      weekTable[1][d] <= compareElement.startTime[idx] ||
      compareElement.endTime[idx] <= weekTable[0][d]
    );
  });

function avoidReservationCollision(
  { day, startTime, endTime },
  sameRoomIdInPayQueue
) {
  const weekTable = [[], []];

  day.forEach((d, idx) => {
    weekTable[0][d] = startTime[idx];
    weekTable[1][d] = endTime[idx];
  });

  return sameRoomIdInPayQueue.every(avoidTimeCollision(weekTable));
}

module.exports = avoidReservationCollision;
