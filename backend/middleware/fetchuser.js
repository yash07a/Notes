const jwt = require("jsonwebtoken");
const JWT_SECRET = "heyits@yas$h";

const fetchuser = (req, res, next) => {
  // To get user from jwt token and adding id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "access denied due to invalid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "access denied due to invalid token" });
  }
};

module.exports = fetchuser;
