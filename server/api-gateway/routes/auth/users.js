const express = require("express");
const router = express.Router();
const getUserByEmail = require("../../middleware/auth/getUserByEmail");

router.get("/accounts/:email", getUserByEmail);

module.exports = router;
