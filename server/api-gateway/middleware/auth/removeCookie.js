function removeCookie(req, res, next) {
  res
    .cookie("access_token", "", {
      httpOnly: false,
      domain: "studycombined.shop",
      secure: true,
      maxAge: 0
    })
    .sendStatus(200);
}

module.exports = removeCookie;
