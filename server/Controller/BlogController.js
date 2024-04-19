const Blog = require("../Models/BlogsModel");
const asyncHandler = require("../util/asyncHandler");

const PostBlogs = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  const blogs = await Blog.create({ title, description, category });
  return res.status(200).json({ msg: "blog posted successfully ", blogs });
});

module.exports = { PostBlogs };
