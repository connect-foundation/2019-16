const passport = require("koa-passport");
const LocalStrategy = require("passport-local").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;

const Partner = require("../models/partner");

/**
 * email / password를 사용한 로그인 전략
 */
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

/**
 * 카카오 OAuth를 사용한 로그인 전략
 */
passport.use(
  new KakaoStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret, // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
      callbackURL: callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
      // 사용자의 정보는 profile에 들어있다.
    }
  )
);

module.exports = passport;
