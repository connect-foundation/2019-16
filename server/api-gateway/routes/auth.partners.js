const express = require("express");
const router = express.Router();
const partnerLogin = require("../middleware/partner-login");
const checkEmail = require("../middleware/check-email");
const partnerJoin = require("../middleware/partner-join");

router.post("/login", partnerLogin);
router.post("/checkEmail", checkEmail);
router.post("/join", partnerJoin);

module.exports = router;
