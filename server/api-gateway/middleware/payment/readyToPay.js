const fetch = require("node-fetch");
const formurlencoded = require("form-urlencoded").default;

function readyToPay(req, res, next) {
  const accessToken = req.body.accessToken;

  delete req.body.accessToken;

  const form = formurlencoded(req.body);

  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${accessToken}`
    },
    body: form
  };

  fetch("https://kapi.kakao.com/v1/payment/ready", options)
    .then(_res => _res.json())
    .then(answer => {
      return res.redirect(answer.next_redirect_pc_url);
    });
}

module.exports = readyToPay;
