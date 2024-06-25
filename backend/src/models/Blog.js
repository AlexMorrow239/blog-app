const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    categoryIds: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: "Category",
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
      default: "https://storage.googleapis.com/ix-blog-app/default.jpeg",
    },
    content: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

// Add a toJSON method to the schema to control the output of blog instances
blogSchema.method("toJSON", function () {
  const {
    __v,
    _id,
    categoryIds: categories,
    authorId: author,
    ...object
  } = this.toObject();
  object.id = _id;

  object.categories = categories.map((category) => {
    return {
      id: category._id,
      title: category.title,
      description: category.description,
      color: category.color,
    };
  });

  // Add author details to the blog object
  object.author = {
    id: author._id,
    firstName: author.firstName,
    lastName: author.lastName,
    email: author.email,
    image: author.image,
    bio: author.bio,
  };
  return object;
});

module.exports = mongoose.model("Blog", blogSchema);
