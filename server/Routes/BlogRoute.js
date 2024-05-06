const {
  PostBlogs,
  getBlogs,
  deleteBlog,
  blogDetails,
  updateBlog,
} = require("../Controller/BlogController");

const uploadImage = require("../Middlewares/multer.middleware");
const router = require("express").Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log(req, file);
//     cb(null, "public");
//   },

//   filename: function (req, file, cb) {
//     console.log(req, file);
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// router.post("/blogposts", upload.single("images"), BlogsController.PostBlogs);
router.post("/blogpost", uploadImage.single("images"), PostBlogs);
router.get("/posted-blogs", getBlogs);
router.delete("/:id", deleteBlog);
router.get("/:id", blogDetails);
router.patch("/:id", updateBlog);

// router.post("/blogposts", BlogsController.PostBlogs);
module.exports = router;
