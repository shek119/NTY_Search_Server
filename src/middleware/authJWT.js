const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).send({ message: "No token provided" });

  jwt.verify(token, process.env.JWR_PR_KEYS, (err, decode) => {
    if (err) return res.status(401).send({ message: "Unauthorized" });

    next();
    return;
  });
};

module.exports = verifyToken;
