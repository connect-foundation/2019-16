const fetch = require("node-fetch");
const formurlencoded = require("form-urlencoded").default;

function readyToPay(req, res, next) {
  const accessToken = req.body.accessToken;
  const {
    cid,
    partner_order_id,
    partner_user_id,
    item_name,
    quantity,
    total_amount,
    tax_free_amount,
    approval_url,
    cancel_url,
    fail_url
  } = req.body;

  const form = formurlencoded({
    cid,
    partner_order_id,
    partner_user_id,
    item_name,
    quantity,
    total_amount,
    tax_free_amount,
    approval_url,
    cancel_url,
    fail_url
  });

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
      return res.json(answer.next_redirect_pc_url);
    });
}

module.exports = readyToPay;
