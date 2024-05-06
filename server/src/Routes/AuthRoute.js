const {
  Signup,
  Login,
  LogOut,
  changeCurrentPassword,
} = require("../Controller/AuthController");
const verifyJWT = require("../Middlewares/auth.middleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/change-password", changeCurrentPassword);
//secured routes
router.route("/logout").post(verifyJWT, LogOut);

module.exports = router;
