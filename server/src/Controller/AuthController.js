const User = require("../Models/UserModel");
const asyncHandler = require("../util/asyncHandler");

// use gareko gare garnu paren vayekole eslai seperate create gareko
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("something wrong in token", error.message);
  }
};

//register user
const Signup = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  if ([email, username, password].some((field) => field?.trim() === "")) {
    return res.status(401).json({ msg: "All fields are required" });
  }

  //existing user
  const existingUser = await User.findOne({ $or: [{ email }] });

  if (existingUser) {
    return res.json({ msg: "User already exists" });
  }

  //create user
  const user = await User.create({
    username,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    return res.json({ msg: "server error" });
  }

  return res.status(201).json({
    msg: "Successful",
    token: await createdUser.generateAccessToken(),
  });
});

//login user
const Login = asyncHandler(async (req, res) => {
  // req body-data
  //username or email
  //find the user
  //password check
  //access and refresh
  //send cookie

  const { email, password } = req.body;

  if (!email) {
    return res.json({ msg: "email is required" });
  }

  const user = await User.findOne({ $or: [{ email }] });

  if (!user) {
    return res.status(400).json({ msg: "User does not exist" });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(401).json({ msg: "Invalid user credentials" });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      msg: "User Logged in",
      user: loggedInUser,
      token: accessToken,
      refreshToken,
    });
});

const LogOut = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    },
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ msg: "User logout!!" });
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    return res.status(400).json({ msg: "Invalid old password" });
  }

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res.status(200).json({ msg: "Password changed successfully" });
});

module.exports = { Signup, Login, LogOut, changeCurrentPassword };
