const User = require("../Models/UserModel");
const asyncHandler = require("../util/asyncHandler");
const jwt = require("jsonwebtoken");

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      res.json({ msg: "Unauthorized request !" });
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      res.json({ msg: "Invalid access token" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ msg: error?.message }, "Invalid Access Token");
  }
});

module.exports = verifyJWT;
