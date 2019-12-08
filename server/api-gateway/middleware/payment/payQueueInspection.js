function payQueueInspection(req, res, next) {
  // redis의 결제 큐를 확인하고 예약 가능한 스터디룸에 대해서 결제를 한다면 next()
  // 결제 하려는 스터디룸과 겹치는 결제 시도가 있다면 실패 반환
  next();
}

module.exports = payQueueInspection;
