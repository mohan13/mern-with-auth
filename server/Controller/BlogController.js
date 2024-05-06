const Blog = require("../Models/BlogsModel");
const asyncHandler = require("../util/asyncHandler");
const { uploadOnCloudinary } = require("../util/cloudinaryConfig");

const getBlogs = asyncHandler(async (_, res) => {
  const data = await Blog.find();
  return res.json({ msg: "All blogs here . . . ", data });
});

const deleteBlog = asyncHandler(async (req, res) => {
  let blog = await Blog.findByIdAndDelete(req.params.id);
  return res.json({ msg: "Blog deleted .... !", blog });
});

const blogDetails = asyncHandler(async (req, res) => {
  let details = await Blog.findById(req.params.id);
  return res.json({ msg: "All details here", details });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {
    title,
    description,
    category,
  });

  await updatedBlog.save();

  return res
    .status(200)
    .json({ msg: "blog updated successfully ", updatedBlog });
});

const PostBlogs = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  const images = req.file.path;

  // if (!blogImageLocalPath) {
  //   return res.status(400).json({ msg: "No file uploaded" });
  // }

  // const blogImage = await uploadOnCloudinary(blogImageLocalPath);

  const blogs = await Blog.create({
    title,
    description,
    category,
    images,
  });

  return res.status(200).json({ msg: "blog posted successfully ", blogs });
});
console.log(PostBlogs);
module.exports = { PostBlogs, getBlogs, deleteBlog, blogDetails, updateBlog };
