const jwtGenerator = require("../auth/jwt-generator");

const responseWithToken = (req, res) => {
  if (req.session && req.session.messages === "fail")
    return res.json({ login: "fail" });

  let jwt;

  try {
    jwt = jwtGenerator(req.user, req.user.role);
  } catch (e) {
    jwt = "";
  } finally {
    return res.cookie("access_token", jwt, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1일
    });
  }
};

const res = {
  cookie(tokenName, payload, options) {
    return payload;
  },
  json(data) {
    return data;
  }
};

test("req.session.messages가 fail일 때", () => {
  const req = {
    session: {
      messages: "fail"
    }
  };

  expect(responseWithToken(req, res)).toEqual({ login: "fail" });
});

test("role이 user나 partner가 아닌 경우 빈 jwt", () => {
  const req = {
    user: {
      role: "something"
    }
  };

  expect(responseWithToken(req, res)).toEqual("");
});
