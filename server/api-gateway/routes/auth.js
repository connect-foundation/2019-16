const express = require("express");
const router = express.Router();
const partnersRouter = require("./auth.partners");
const usersRouter = require("./auth.users");

router.use("/partners", partnersRouter);
router.use("/users", usersRouter);

module.exports = router;
