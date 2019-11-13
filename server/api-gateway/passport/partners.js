const passport = require("koa-passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy((username, password, done) => {
    // User.findOne({ username: username }, (err, user) => {
    //   if (err) return done(err);
    //   if (!user) return done(null, false, { message: "사용자 없음" });
    //   if (!user.validPassword(password))
    //     return done(null, false, { message: "비번 틀림" });
      return done(null, {a:"a"});
    // });
  }),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
