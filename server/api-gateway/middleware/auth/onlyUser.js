function onlyUser(req, res, next) {
  const role = req.role;

  if (role === "user") next();
  res.status(404).redirect("http://studycombined.shop/unauthorized");
}

module.exports = onlyUser;
