const { Signup, Login, LogOut } = require("../Controller/AuthController");
const verifyJWT = require("../Middlewares/auth.middleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);

//secured routes
router.route("/logout").post(verifyJWT, LogOut);

module.exports = router;
