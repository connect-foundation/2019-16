const jwt = require("jsonwebtoken");
const jwtGenerator = require("../auth/jwt-generator");
const USER_JWT_SECRET = "c6c5be88-e1ac-4e6f-a505-f2ce2740744f";
const PARTNER_JWT_SECRET = "0ff38f01-05be-41e4-9bb5-338835dc6199";

test("사용자용 JWT는 사용자 키로 verify 된다.", () => {
  const userToken = jwtGenerator({ test: "this is for test" }, "user");
  const decoded = jwt.verify(userToken, USER_JWT_SECRET);

  expect(decoded).toEqual({ test: "this is for test" });
});

test("파트너용 JWT는 파트너 키로 verify 된다.", () => {
  const partnerToken = jwtGenerator({ test: "this is for test" }, "partner");
  const decoded = jwt.verify(partnerToken, PARTNER_JWT_SECRET);

  expect(decoded).toEqual({ test: "this is for test" });
});

test("사용자용 JWT는 파트너 키로 verify 되지 않는다.", () => {
  const userToken = jwtGenerator({ test: "this is for test" }, "user");
  let decoded;

  try {
    decoded = jwt.verify(userToken, PARTNER_JWT_SECRET);
  } catch (e) {
    decoded = e;
  } finally {
    expect(decoded).toEqual({
      name: "JsonWebTokenError",
      message: "invalid signature"
    });
  }
});

test("파트너용 JWT는 사용자 키로 verify 되지 않는다.", () => {
  const partnerToken = jwtGenerator({ test: "this is for test" }, "partner");
  let decoded;

  try {
    decoded = jwt.verify(partnerToken, USER_JWT_SECRET);
  } catch (e) {
    decoded = e;
  } finally {
    expect(decoded).toEqual({
      name: "JsonWebTokenError",
      message: "invalid signature"
    });
  }
});
