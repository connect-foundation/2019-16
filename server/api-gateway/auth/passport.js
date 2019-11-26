const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    // User.findOne({ username: username }, function(err, user) {
    //   if (err) return done(err);
    //   if (!user) return done(null, false);
    //   if (!user.verifyPassword(password)) return done(null, false);
    //   return done(null, user);
    // });
    debugger;

    done(null, { email: "hi" });
  })
);

passport.serializeUser(function(user, done) {
  done(null, "user");
});

passport.deserializeUser(function(user, done) {
  done(null, "user");
});

module.exports = passport;
