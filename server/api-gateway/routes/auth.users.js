const express = require("express");
const router = express.Router();
const passport = require("passport");
const responseWithToken = require("../middleware/response-token");

router.get("/login", passport.authenticate("kakao"));
router.get(
  "/callback",
  passport.authenticate("kakao", { failureRedirect: "/" }),
  responseWithToken
);

module.exports = router;
