const passport = require("koa-passport");
const LocalStrategy = require("passport-local").Strategy;
const Partner = require("../models/partner");

passport.use(
  new LocalStrategy((email, password, done) => {
    Partner.findOne({ email: email, password: password }, (err, partner) => {
      if (err) return done(err);
      if (!partner) return done(null, false, { message: "로그인 실패" });
      return done(null, partner);
    });
  })
);

passport.serializeUser((partner, done) => {
  done(null, partner);
});

passport.deserializeUser((partner, done) => {
  done(null, partner);
});

module.exports = passport;
