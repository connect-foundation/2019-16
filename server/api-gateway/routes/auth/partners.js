const express = require("express");
const router = express.Router();
const partnerLogin = require("../../middleware/partner-login");
const checkEmail = require("../../middleware/check-email");
const partnerJoin = require("../../middleware/partner-join");
const responseWithToken = require("../../middleware/response-token");

router.post("/login", partnerLogin, responseWithToken);
router.get("/checkEmail", checkEmail);
router.post("/join", partnerJoin);

module.exports = router;
