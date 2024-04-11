require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENv !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

module.exports = { generateToken };
