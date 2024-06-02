const Blog = require("../models/Blog");

const createBlogs = async (req, res) => {
  try {
    const categoryIds = req?.body?.categories.map((x) => x.id);
    const blog = new Blog({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      content: req.body.content,
      author: req.body.author,
      categoryIds: categoryIds,
    });

    const newBlog = await blog.save();

    const blogRes = await Blog.findById(newBlog._id).populate({
      path: "categoryIds",
    });

    res.status(200).json({
      message: "Blog created!",
      data: blogRes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, data: {} });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate({ path: "categoryIds" });
    res.status(200).json({
      message: "Get all blogs!",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ message: error.message, data: {} });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate({
      path: "categoryIds",
    });
    if (blog) {
      res.status(200).json({ message: "Return blog by ID!", data: blog });
    } else {
      res.status(404).json({ message: "Blog not found!", data: {} });
    }
  } catch (err) {
    res.status(500).json({ message: error.message, data: {} });
  }
};

const getBlogsByCategoryID = async (req, res) => {
  try {
    let filter = {};
    if (req.params.id != "null" && req.params.id != "undefined") {
      filter = { categoryIds: req.params.id };
    }
    const blogs = await Blog.find(filter).populate({
      path: "categoryIds",
    });
    res.status(200).json({
      message: "Get blogs by categoryID!",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ message: error.message, data: {} });
  }
};

const updateBlogByID = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate({
      path: "categoryIds",
    });
    if (blog) {
      const categoryIds = req?.body?.categories.map((x) => x.id);
      blog.authorId = req?.body?.authorId || blog.authorId;
      blog.categoryIds = categoryIds ? categoryIds : blog.categoryIds;
      blog.title = req?.body?.title || blog.title;
      blog.description = req?.body?.description || blog.description;
      blog.content = req.body.content ? req.body.content : blog.content;
      const updatedBlog = await blog.save();
      const blogRes = await updatedBlog.populate({
        path: "categoryIds",
      });
      res.status(200).json({ message: "Blog updated!", data: blogRes });
    } else {
      res.status(404).json({ message: "Blog not found!", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: {} });
  }
};

const deleteBlogByID = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (blog) {
      return res
        .status(200)
        .json({ message: "Blog deleted!", id: req.params.id });
    } else {
      return res.status(404).json({ message: "Blog not found!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const blogController = {
  createBlogs,
  getBlogs,
  getBlogById,
  getBlogsByCategoryID,
  updateBlogByID,
  deleteBlogByID,
};

module.exports = blogController;
