const express = require("express");
const router = express.Router();
const localLogin = require("../auth/localLogin");

router.post("/login", localLogin);

module.exports = router;
