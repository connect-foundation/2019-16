const express = require("express");
const router = express.Router();
const onlyUser = require("../../middleware/auth/onlyUser");
const getUserByEmail = require("../../middleware/auth/getUserByEmail");
const registerFirstTimeUser = require("../../middleware/auth/registerFirstTimeUser");
const updateKakaoAccessToken = require("../../middleware/auth/updateKakaoAccessToken");

router.get("/accounts/:email", getUserByEmail);
router.post("/accounts", registerFirstTimeUser);
router.patch("/accounts/:email", onlyUser, updateKakaoAccessToken);
module.exports = router;
