const {
  getBlogs,
  deleteBlog,
  blogDetails,
  updateBlog,
  createBlog,
  postedByMe,
} = require("../Controller/BlogController");
const verifyJWT = require("../Middlewares/auth.middleware");

const uploadImage = require("../Middlewares/multer.middleware");
const router = require("express").Router();

router
  .route("/")
  .post(verifyJWT, uploadImage.single("images"), createBlog)
  .get(getBlogs);

router.route("/get/my-post").get(verifyJWT, postedByMe);

router
  .route("/:id")
  .delete(verifyJWT, deleteBlog)
  .get(blogDetails)
  .patch(verifyJWT, updateBlog);

// router.post("/blogposts", BlogsController.PostBlogs);
module.exports = router;
