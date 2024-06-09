const Blog = require("../Models/BlogsModel");
const User = require("../Models/UserModel");
const asyncHandler = require("../util/asyncHandler");
const { uploadOnCloudinary } = require("../util/cloudinaryConfig");

const getBlogs = asyncHandler(async (req, res) => {
  const data = await Blog.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "user_details",
      },
    },
    {
      $addFields: {
        auther_details: {
          $arrayElemAt: ["$user_details", 0],
        },
      },
    },
  ]);
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

const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  const imageLocalPath = req.file.path;
  const owner = req.user._id;

  if (!imageLocalPath) {
    return res.status(400).json({ msg: "No file uploaded", imageLocalPath });
  }

  const blogImage = await uploadOnCloudinary(imageLocalPath);

  const blogs = await Blog.create({
    title,
    description,
    category,
    images: blogImage.url,
    owner,
  });

  return res.status(200).json({ msg: "Posted successfully ", blogs });
});

module.exports = { createBlog, getBlogs, deleteBlog, blogDetails, updateBlog };
