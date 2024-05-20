const {
  Signup,
  Login,
  LogOut,
  changeCurrentPassword,
} = require("../Controller/AuthController");
const verifyJWT = require("../Middlewares/auth.middleware");
const router = require("express").Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/change-password", changeCurrentPassword);
//secured routes
router.route("/logout").post(verifyJWT, LogOut);

module.exports = router;
