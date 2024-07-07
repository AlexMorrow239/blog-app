const Blog = require("../models/Blog");

const cloudStorage = require("../services/cloud-storage");

const createBlogs = async (req, res) => {
  try {
    let imageURL = "";
    if (req?.file?.path) {
      imageURL = await cloudStorage.uploadToFirebaseStorage(
        req?.file?.path,
        req?.file?.path
      );
    }
    const categoryIds = JSON.parse(req?.body?.categories).map((x) => x.id);
    const blog = new Blog({
      title: req.body.title,
      description: req.body.description,
      image: imageURL || undefined,
      content: JSON.parse(req?.body?.content),
      authorId: req.body.authorId,
      categoryIds: categoryIds,
    });
    const newBlog = await blog.save();
    const blogRes = await Blog.findById(newBlog._id)
      .populate({
        path: "categoryIds",
      })
      .populate({ path: "authorId" });
    res.status(201);
    res.json({
      message: "Blog created!",
      data: blogRes,
    });
  } catch (err) {
    res.status(500);
    res.json({ message: err.message, data: {} });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate({ path: "categoryIds" })
      .populate({ path: "authorId" })
      .sort({ createdAt: -1 }); // Sort by newest first
    res.status(200);
    res.json({
      message: "Get all blogs!",
      data: blogs,
    });
  } catch (err) {
    res.status(500);
    res.json({ message: err.message, data: {} });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate({
        path: "categoryIds",
      })
      .populate({ path: "authorId" });
    if (blog) {
      res.status(200).json({ message: "Return blog by ID!", data: blog });
    } else {
      res.status(404).json({ message: "Blog not found!", data: {} });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, data: {} });
  }
};

const getBlogsByCategoryID = async (req, res) => {
  try {
    let filter = {};
    if (req.params.id != "null" && req.params.id != "undefined") {
      filter = { categoryIds: req.params.id };
    }
    const blogs = await Blog.find(filter)
      .populate({
        path: "categoryIds",
      })
      .populate({ path: "authorId" });
    res.status(200).json({
      message: "Get blogs by categoryID!",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, data: {} });
  }
};

const getBlogsByAuthorID = async (req, res) => {
  try {
    let filter = {};
    if (req.params.id != "null" && req.params.id != "undefined") {
      filter = { authorId: req.params.id };
    }
    const blogs = await Blog.find(filter)
      .populate({
        path: "categoryIds",
      })
      .populate({ path: "authorId" });
    res.status(200).json({
      message: "Get blogs by authorID!",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, data: {} });
  }
};

const updateBlogByID = async (req, res) => {
  try {
    let imageURL = "";
    if (req?.file?.path) {
      imageURL = await cloudStorage.uploadToFirebaseStorage(
        req?.file?.path,
        req?.file?.path
      );
    }
    const blog = await Blog.findById(req.params.id)
      .populate({
        path: "categoryIds",
      })
      .populate({ path: "authorId" });

    if (
      blog &&
      req?.file?.path &&
      blog.image !== "https://storage.googleapis.com/ix-blog-app/default.jpeg"
    ) {
      // Take the URL, get the last segment, and remove the query parameters
      const encodedFileName = blog.image.split("/").pop().split("?")[0];
      const decodedFileName = decodeURIComponent(encodedFileName); // Decode the URL
      await cloudStorage.deleteFromFirebaseStorage(decodedFileName);
    }
    if (blog) {
      const categoryIds = JSON.parse(req?.body?.categories).map((x) => x.id);
      blog.image = imageURL ? imageURL : blog.image;
      blog.authorId = req?.body?.authorId || blog.authorId;
      blog.categoryIds = categoryIds ? categoryIds : blog.categoryIds;
      blog.title = req?.body?.title || blog.title;
      blog.description = req?.body?.description || blog.description;
      blog.content = req.body.content
        ? JSON.parse(req.body.content)
        : blog.content;
      const updatedBlogRes = await blog
        .save()
        .populate({
          path: "categoryIds",
        })
        .populate({ path: "authorId" });

      res.status(200).json({ message: "Blog updated!", data: updatedBlogRes });
    } else {
      res.status(404).json({ message: "Blog not found!", data: [] });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, data: {} });
  }
};

const deleteBlogByID = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (blog) {
      if (
        blog.image &&
        blog.image !== "https://storage.googleapis.com/ix-blog-app/default.jpeg"
      ) {
        // Take the URL, get the last segment, and remove the query parameters
        const encodedFileName = blog.image.split("/").pop().split("?")[0];
        const decodedFileName = decodeURIComponent(encodedFileName); // Decode the URL
        await cloudStorage.deleteFromFirebaseStorage(decodedFileName);
      }
      return res
        .status(200)
        .json({ message: "Blog deleted!", id: req.params.id });
    } else {
      return res.status(404).json({ message: "Blog not found!" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const blogController = {
  createBlogs,
  getBlogs,
  getBlogById,
  getBlogsByCategoryID,
  getBlogsByAuthorID,
  updateBlogByID,
  deleteBlogByID,
};

module.exports = blogController;

//path: backend/src/controllers/Blogs.js
