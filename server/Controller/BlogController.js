const Blog = require("../Models/BlogsModel");
const asyncHandler = require("../util/asyncHandler");

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

  const blogs = await Blog.create({ title, description, category });
  return res.status(200).json({ msg: "blog posted successfully ", blogs });
});

module.exports = { PostBlogs, getBlogs, deleteBlog, blogDetails, updateBlog };
