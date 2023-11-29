import Jwt from "jsonwebtoken";
import "dotenv/config.js";
const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1];
  Jwt.verify(token,`usmanbey` , function (err, decoded) {
    if (err) {
      return res.status(401).send({ err });
    }
  });
  return next();

  return next();
};

export default verifyToken;
