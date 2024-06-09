const {
  getBlogs,
  deleteBlog,
  blogDetails,
  updateBlog,
  createBlog,
} = require("../Controller/BlogController");
const verifyJWT = require("../Middlewares/auth.middleware");

const uploadImage = require("../Middlewares/multer.middleware");
const router = require("express").Router();

router.post("/add-blog", verifyJWT, uploadImage.single("images"), createBlog);
router.get("/posted-blogs", verifyJWT, getBlogs);
router.delete("/:id", verifyJWT, deleteBlog);
router.get("/:id", blogDetails);
router.patch("/:id", verifyJWT, updateBlog);

// router.post("/blogposts", BlogsController.PostBlogs);
module.exports = router;
