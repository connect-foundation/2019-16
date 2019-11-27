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

        obj.email = profile._json.kakao_account.email;
        obj.name = profile.username;
        obj.profileImage = profile._json.properties.profile_image;
        obj.gender = profile._json.kakao_account.gender;
        obj.ageRange = profile._json.kakao_account.age_range;
        obj.birthday = profile._json.kakao_account.birthday;

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
