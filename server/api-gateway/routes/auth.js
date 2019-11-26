const express = require("express");
const router = express.Router();
const partnersRouter = require("./auth.partners");

router.use("/partners", partnersRouter);

module.exports = router;
