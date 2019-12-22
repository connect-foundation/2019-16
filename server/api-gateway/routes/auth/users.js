const express = require("express");
const router = express.Router();
const removeCookie = require("../../middleware/auth/removeCookie");
const getUserById = require("../../middleware/auth/getUserById");
const registerFirstTimeUser = require("../../middleware/auth/registerFirstTimeUser");

router.get("/logout", removeCookie);
router.get("/accounts/:userId", getUserById);
router.post("/accounts", registerFirstTimeUser);

module.exports = router;
