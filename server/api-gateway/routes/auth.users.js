const express = require("express");
const router = express.Router();
const passport = require("passport");
const responseWithToken = require("../middleware/response-token");

router.get("/login", passport.authenticate("kakao"));
router.get(
  "/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/auth/users/fail"
  }),
  responseWithToken
);

router.get("/fail", (req, res) => {
  res.clearCookie("access_token", {
    path: "/"
  });
  res.redirect("http://106.10.41.25:3000");
});

router.get("/logout", (req, res) => {
  res.clearCookie("access_token", {
    path: "/"
  });
  res.redirect("http://106.10.41.25:3000");
});

module.exports = router;
