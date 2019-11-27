const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

function config(server) {
  passport.use(
    "kakao",
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        clientSecret: process.env.KAKAO_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/auth/users/callback"
      },
      function(accessToken, refreshToken, params, profile, done) {
        // authorization 에 성공했을때의 액션
        const obj = {};

        user.role = "user";

        return done(null, obj);
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  server.use(passport.initialize());
}

module.exports = config;
