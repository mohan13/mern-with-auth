const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
  },
  images: { type: String },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
