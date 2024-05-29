const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  authorId: {
    type: String,
    required: true,
  },
  categoryIds: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  content: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
