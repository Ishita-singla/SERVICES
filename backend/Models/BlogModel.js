const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  photo: { type: String, required: true }, // Cloudinary Image URL
  content: { type: String, required: true },
  
  createdAt: { type: Date, default: Date.now },
});

const Blogmodel=mongoose.model("Blog",blogSchema);
module.exports = Blogmodel;