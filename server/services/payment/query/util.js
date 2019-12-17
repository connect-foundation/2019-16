const fetch = require("node-fetch");
const formurlencoded = require("form-urlencoded").default;

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

async function getNextUrl({ kakaoAccessToken, paymentInfo }) {
  const form = formurlencoded(paymentInfo);
  const url = "https://kapi.kakao.com/v1/payment/ready";
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${kakaoAccessToken}`
    },
    body: form
  };

  const result = await fetch(url, options);
  debugger;
  return result;
}

module.exports = { avoidReservationCollision, getNextUrl };
