const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const User = require("../models/user");

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
        const user = {};

        user.email = profile._json.kakao_account.email;
        user.gender = profile._json.kakao_account.gender;
        user.ageRange = profile._json.kakao_account.age_range.split("~")[0];
        user.name = profile.username;
        user.profileImage = profile._json.properties.profile_image;
        user.birthday = profile._json.kakao_account.birthday;
        user.role = "user";

        return done(null, user);
      }
    )
  );

  passport.serializeUser(function(user, done) {
    User.findOne({ email: user.email }, (err, res) => {
      if (!res)
        User.create({
          email: user.email,
          gender: user.gender,
          ageRange: user.ageRange,
          history: [],
          ownGroups: [],
          partipatedGroups: []
        });
    });
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  server.use(passport.initialize());
}

module.exports = config;
