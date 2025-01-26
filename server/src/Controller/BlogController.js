const { default: mongoose } = require("mongoose");
const Blog = require("../Models/BlogsModel");
const User = require("../Models/UserModel");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const asyncHandler = require("../util/asyncHandler");
const { uploadOnCloudinary } = require("../util/cloudinaryConfig");

const getBlogs = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const data = await Blog.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "user_details",
      },
    },
    // {
    //   $addFields: {
    //     auther_details: {
    //       $arrayElemAt: ["$user_details", 0],
    //     },
    //   },
    // },
  ]);
  // const data = await Blog.find({});
  return res.json({ msg: "All blogs here . . . ", data });
});

const deleteBlog = asyncHandler(async (req, res) => {
  let blog = await Blog.findByIdAndDelete(req.params.id);
  return res.json({ msg: "Blog deleted .... !", blog });
});

const blogDetails = asyncHandler(async (req, res) => {
  let details = await Blog.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "user_details",
      },
    },
  ]);

  return res.json({ msg: "All details here", details });
});

const postedByMe = asyncHandler(async (req, res) => {
  let myPost = await Blog.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "user_details",
      },
    },
  ]);

  if (myPost.length === 0) {
    return res.status(200).json({ msg: "You have no post" });
  }
  return res.json({ msg: "All details here", myPost });
});

const updateBlog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { title, description, category } = req.body;

  let imageName;
  if (req.file) {
    imageName = "https://mern-backend-p9kr.onrender.com" + req.file.filename;
    const blog = await Blog.findById(id);
    const oldImageName = blog.images;

    fs.unlink(`storage/${oldImageName}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File deleted successfully");
      }
    });
  }

  await Blog.findByIdAndUpdate(id, {
    title,
    description,
    category,
    images: imageName,
  });
  res.status(200).json({
    message: "Blog updated successfully",
  });
});

// const updateBlog = asyncHandler(async (req, res) => {
//   const id = req.params.id;

//   const { title, description, category, images } = req.body;
//   const imageLocalPath = req.file?.path;

//   console.log("file", req.file, images, req.body);

//   if (!imageLocalPath && !images) {
//     return res
//       .status(400)
//       .json({ msg: "No image uploaded and no image URL provided" });
//   }

//   let blogImageUrl = images; // Use the existing image URL if no new image is uploaded

//   if (imageLocalPath) {
//     // If a new image is uploaded, handle the deletion of the old image
//     if (images) {
//       const publicId = images.split("/").pop().split(".")[0];
//       console.log("publicId", publicId);
//       await cloudinary.uploader.destroy(publicId);
//     }

//     try {
//       // Upload the new image to Cloudinary
//       const blogImage = await uploadOnCloudinary(imageLocalPath);

//       // Check if the upload was successful and returned a valid object
//       if (!blogImage || !blogImage.url) {
//         return res
//           .status(400)
//           .json({ msg: "Error while uploading image to Cloudinary" });
//       }

//       // Use the new image URL
//       blogImageUrl = blogImage.url;
//     } catch (error) {
//       console.error(error);
//       return res
//         .status(500)
//         .json({ msg: "Error uploading the new image", error });
//     }
//   }

//   try {
//     // Update the blog with the new or existing image
//     const updatedBlog = await Blog.findByIdAndUpdate(
//       id,
//       {
//         $set: {
//           title,
//           description,
//           category,
//           images: blogImageUrl,
//         },
//       },
//       { new: true },
//     );

//     return res
//       .status(200)
//       .json({ msg: "Blog updated successfully", updatedBlog });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ msg: "Error updating the blog", error });
//   }
// });

const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  const imageLocalPath = req.file;
  const owner = req.user._id;

  console.log(req.file.path);
  let filename;
  if (imageLocalPath) {
    filename = "https://mern3-node.onrender.com/" + req.file.filename;
  } else {
    filename =
      "https://cdn.mos.cms.futurecdn.net/i26qpaxZhVC28XRTJWafQS-1200-80.jpeg";
  }

  if (!title || !category || !description) {
    return res.status(400).json({
      message: "Please provide title,category,description",
    });
  }

  // const blogImage = await uploadOnCloudinary(imageLocalPath);

  const blogs = await Blog.create({
    title,
    description,
    category,
    images: filename,
    owner,
  });

  return res.status(200).json({ msg: "Posted successfully ", blogs });
});

module.exports = {
  createBlog,
  getBlogs,
  deleteBlog,
  blogDetails,
  updateBlog,
  postedByMe,
};
