const express = require("express");
const router = express.Router();
const onlyUser = require("../../middleware/auth/onlyUser");
const getUserById = require("../../middleware/auth/getUserById");
const registerFirstTimeUser = require("../../middleware/auth/registerFirstTimeUser");
const updateKakaoAccessToken = require("../../middleware/auth/updateKakaoAccessToken");

router.get("/accounts/:userId", getUserById);
router.post("/accounts", registerFirstTimeUser);
router.patch("/accounts/:userId", onlyUser, updateKakaoAccessToken);

module.exports = router;
