const express = require("express");
const router = express.Router();
const removeCookie = require("../../middleware/auth/removeCookie");
const getUserById = require("../../middleware/auth/getUserById");
const registerFirstTimeUser = require("../../middleware/auth/registerFirstTimeUser");
const updateKakaoAccessToken = require("../../middleware/auth/updateKakaoAccessToken");

router.get("/logout", removeCookie);
router.get("/accounts/:userId", getUserById);
router.post("/accounts", registerFirstTimeUser);
router.patch("/accounts/:userId", updateKakaoAccessToken);

module.exports = router;
