const express = require("express");
const router = express.Router();
// const partnersRouter = require("./partners");
const usersRouter = require("./users");

// router.use("/partners", partnersRouter);
router.use("/users", usersRouter);

module.exports = router;
