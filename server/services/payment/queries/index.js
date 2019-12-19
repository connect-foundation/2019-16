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
  const { roomId, day, startTime, endTime } = reservationInfo;
  const sameRoomIdInPayQueue = getElementsHaveSameRoomId(roomId);
  let nextUrl = "";

  if (
    sameRoomIdInPayQueue.length === 0 ||
    avoidReservationCollision({ day, startTime, endTime }, sameRoomIdInPayQueue)
  ) {
    const res = await getNextUrl(roomId, userId, paymentInfo);

    nextUrl = res.nextUrl;
    paymentInfo.tid = res.tid;

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
      nextQuery: "apigateway",
      params: {}
    },
    body: { nextUrl, status: 200 }
  };
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

  const dbResult = await Payment.create({ ...receipt, userId });

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
