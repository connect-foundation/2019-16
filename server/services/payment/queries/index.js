const {
  avoidReservationCollision,
  getNextUrl,
  requestPaymentApproval,
  getQueueByUserId
} = require("./util");
const Payment = require("../models/payment");

const payQueue = {};

function getElementsHaveSameRoomId(roomId) {
  if (!payQueue[roomId]) {
    payQueue[roomId] = [];

    return [];
  }

  return payQueue[roomId];
}

exports.inspectQueue = async ({ userId, paymentInfo, reservationInfo }) => {
  const { roomId, days, startTime, endTime } = reservationInfo;
  const sameRoomIdInPayQueue = getElementsHaveSameRoomId(roomId);
  const paymentInfoAlreadyExist = sameRoomIdInPayQueue.filter(
    p => p.userId === userId
  );

  if (paymentInfoAlreadyExist.length === 1) {
    return {
      headers: {
        method: "REPLY",
        curQuery: "inspectQueue",
        nextQuery: "apigateway",
        params: {}
      },
      body: { nextUrl: paymentInfoAlreadyExist[0].nextUrl, status: 200 }
    };
  }

  let nextUrl = "";
  const startTimes = startTime;
  const endTimes = endTime;

  if (
    sameRoomIdInPayQueue.length === 0 ||
    avoidReservationCollision(
      { days, startTimes, endTimes },
      sameRoomIdInPayQueue
    )
  ) {
    // 결제 준비 가능
    const res = await getNextUrl(roomId, userId, paymentInfo);

    nextUrl = res.nextUrl;
    paymentInfo.tid = res.tid;
    if (nextUrl) {
      payQueue[roomId].push({
        reservationInfo,
        paymentInfo,
        userId,
        createdAt: new Date(),
        nextUrl
      });

      return {
        headers: {
          method: "REPLY",
          curQuery: "inspectQueue",
          nextQuery: "apigateway",
          params: {}
        },
        body: { nextUrl, status: 200 }
      };
    } else {
      return {
        headers: {
          method: "ERROR",
          curQuery: "inspectQueue",
          nextQuery: "apigateway",
          params: {}
        },
        body: {
          err: true,
          msg: "카카오 페이 API 오류",
          status: 404
        }
      };
    }
  } else {
    // 결제 준비 실패,
    return {
      headers: {
        method: "REPLY",
        curQuery: "inspectQueue",
        nextQuery: "apigateway",
        parmas: {}
      },
      body: {
        err: true,
        msg: "동일한 스터디룸에 대해서 결제가 진행중입니다.",
        status: 200
      }
    };
  }
};

exports.approvePayment = async ({ pg_token, userId, roomId }) => {
  const element = getQueueByUserId(payQueue[roomId], userId)[0];

  if (element === null)
    return {
      headers: {
        method: "ERROR",
        curQuery: "approvePayment",
        nextQuery: "apigateway",
        endQuery: "approvePayment",
        params: {}
      },
      body: { err: true, msg: "결제 요청이 존재하지 않음", status: 404 }
    };

  const { paymentInfo, reservationInfo } = element;
  const receipt = await requestPaymentApproval({ paymentInfo, pg_token });

  if (receipt === null) {
    const idxToDelete = payQueue[roomId].findIndex(
      ele => ele.userId === userId
    );

    payQueue[roomId].splice(idxToDelete, 1);

    return {
      headers: {
        method: "REPLY",
        curQuery: "approvePayment",
        nextQuery: "apigateway",
        endQuery: "approvePayment",
        params: {}
      },
      body: { err: true, msg: "결제 승인 에러", status: 400 }
    };
  }

  await Payment.create({ ...receipt, userId });

  return {
    headers: {
      method: "REPLY",
      curQuery: "approvePayment",
      nextQuery: "addReservation",
      params: { reservationInfo, userId }
    },
    body: {}
  };
};

exports.removeInQueue = ({ roomId, userId }) => {
  const idxToDelete = payQueue[roomId].findIndex(
    element => element.userId === userId
  );
  const { reservationInfo, paymentInfo } = payQueue[roomId][idxToDelete];

  payQueue[roomId].splice(idxToDelete, 1);

  return {
    headers: {
      method: "REPLY",
      curQuery: "removeInQueue",
      nextQuery: "apigateway",
      params: {}
    },
    body: { reservationInfo, paymentInfo, status: 200 }
  };
};

function timeOver({ createdAt }, now) {
  if (now - createdAt > 10 * 60 * 1000) return true;
  return false;
}

function garbageCollector() {
  const now = new Date();

  Object.keys(payQueue).forEach(roomId => {
    while (true) {
      if (payQueue[roomId].length === 0) break;
      if (timeOver(payQueue[roomId][0], now)) {
        payQueue[roomId].shift();
      }
    }
  });
}

setInterval(() => {
  garbageCollector();
}, 60 * 1000);
