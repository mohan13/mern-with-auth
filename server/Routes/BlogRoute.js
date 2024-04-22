const { PostBlogs, getBlogs } = require("../Controller/BlogController");
// const uploadImage = require("../Middlewares/multer.middleware");
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
// router.post("/blog", PostBlogs);
router.post("/blogpost", PostBlogs);
router.get("/posted-blogs", getBlogs);

// router.post("/blogposts", BlogsController.PostBlogs);
module.exports = router;
