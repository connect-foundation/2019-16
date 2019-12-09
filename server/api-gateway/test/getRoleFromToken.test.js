const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "/../../.env") });

const getRoleFromToken = require("../lib/getRoleFromToken");

const mockData = {
  verifiedUserTokens: [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZmRqayIsInJvbGUiOiJ1c2VyIn0.j7W6Pyz8tztszXxJToF2OqqnPS0qmP4vXz9kf7byJSo",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhZGZzYWQiLCJyb2xlIjoidXNlciJ9.4N0gJq2UZllKA6Zl2ENdDuX4dKjVZfk52AjOaYN8Yok"
  ],
  verifiedPartnerTokens: [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGZhc2FhYWEiLCJyb2xlIjoicGFydG5lciJ9.hP9BmTByYUm_RkZG9j7_txLeoCIkGVhI2vvABSsXwtI",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYWEiLCJyb2xlIjoicGFydG5lciJ9.LutanDt03FoUCVcuZEHWslbpnfusieajoya63o02m4c"
  ],
  unauthorized: [
    "helloworld",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYWEiLCJyb2xlIjoidXNlciJ9.3BVT13JKxXd2MvdHGetwl8wcRzmmFF-p0e0HW_EGa0Y"
  ]
};

test("올바른 사용자 토큰 1", () => {
  expect(getRoleFromToken(mockData.verifiedUserTokens[0])).toBe("user");
});
test("올바른 사용자 토큰 2", () => {
  expect(getRoleFromToken(mockData.verifiedUserTokens[1])).toBe("user");
});
test("올바른 파트너 토큰 1", () => {
  expect(getRoleFromToken(mockData.verifiedPartnerTokens[0])).toBe("partner");
});
test("올바른 파트너 토큰 2", () => {
  expect(getRoleFromToken(mockData.verifiedPartnerTokens[1])).toBe("partner");
});
test("잘못된 토큰 1", () => {
  expect(() => {
    getRoleFromToken(mockData.unauthorized[0]);
  }).toThrow("Unverified Token");
});
test("잘못된 토큰 2", () => {
  expect(() => {
    getRoleFromToken(mockData.unauthorized[1]);
  }).toThrow("Unverified Token");
});
