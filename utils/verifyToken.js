const jwt = require("jsonwebtoken");
const secretAccesTokenKey = process.env.STORE_APP_SECRET_KEY;

const verifyToken = (req, res, next) => {
  if (!req.headers["x-access-token"]) {
    return res.status(403).send({ auth: false, message: "No Token Provided" });
  }

  const token = req.headers["x-access-token"];
  jwt.verify(token, secretAccesTokenKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ auth: false, message: "Access Denied" });
    }
    req.userId = decoded.userId;
    req.user = decoded.email;
    next();
  });
};

module.exports = verifyToken;
