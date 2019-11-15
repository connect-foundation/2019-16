const passport = require("koa-passport");
const LocalStrategy = require("passport-local").Strategy;
const Partner = require("../models/partner");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      Partner.findOne({ email: email, password: password }, (err, partner) => {
        if (err) return done(err);
        if (!partner) return done(null, false, { message: "로그인 실패" });
        return done(null, partner);
      });
    }
  )
);

module.exports = passport;
