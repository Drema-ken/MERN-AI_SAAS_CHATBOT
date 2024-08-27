import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const createToken = (id, email, expiresIn) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  return token;
};

export const verifyToken = (req, res, next) => {
  const token = req.signedCookies["auth_token"]; // accesing auth token cookies sent by the frontend
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }
  return new Promise((resolve, rej) => {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, success) => {
      if (err) {
        rej(err.message);
        return res.status(401).json({ message: "Token expired" });
      } else {
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};
