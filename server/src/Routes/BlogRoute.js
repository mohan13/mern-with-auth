const {
  PostBlogs,
  getBlogs,
  deleteBlog,
  blogDetails,
  updateBlog,
} = require("../Controller/BlogController");

const uploadImage = require("../Middlewares/multer.middleware");
const router = require("express").Router();

router.post("/blogpost", uploadImage.single("images"), PostBlogs);
router.get("/posted-blogs", getBlogs);
router.delete("/:id", deleteBlog);
router.get("/:id", blogDetails);
router.patch("/:id", updateBlog);

// router.post("/blogposts", BlogsController.PostBlogs);
module.exports = router;
