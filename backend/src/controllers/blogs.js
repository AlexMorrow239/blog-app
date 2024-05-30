const Blog = require("../models/blogModel");

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(201).json({ message: "get all blogs", data: blogs });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.status(201).json({ message: "get a blog by id", data: blog });
    } else {
      res.status(404).json({ message: "blog not found", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const getBlogsByCategoryId = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    if (blogs) {
      blogs.filter((blog) => {
        blog.categoryIds.some((categoryId) => {
          return categoryId === req.params.categoryIds;
        });
      });
      res
        .status(201)
        .json({ message: "get blogs by category id", data: blogs });
    } else {
      res.status(500).json({ message: "there are no blogs", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const getBlogsByAuthorId = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    if (blogs) {
      blogs.filter((blog) => {
        blog.authorId === req.params.authorId;
      });
      res.status(201).json({ message: "get blogs by author id", data: blogs });
    } else {
      res.status(500).json({ message: "there are no blogs", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const createBlog = async (req, res) => {
  try {
    const blog = new Blog({
      authorId: req.body.authorId,
      categoryId: req.body.categoryId,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      content: req.body.content,
    });
    const blogRes = await blog.save();
    res.status(201).json({ message: "create a blog", data: blogRes });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const updateBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      blog.authorId = req.body.authorId || blog.authorId;
      blog.categoryId = req.body.categoryId || blog.categoryId;
      blog.title = req.body.title || blog.title;
      blog.description = req.body.description || blog.description;
      blog.image = req.body.image || blog.image;
      blog.content = req.body.content || blog.content;

      const updatedBlog = await blog.save();
      res.status(201).json({ message: "update a blog", data: updatedBlog });
    } else {
      res.status(404).json({ message: "blog not found", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (blog) {
      return res.status(201).json({ message: "delete a blog", data: blog });
    } else {
      return res.status(404).json({ message: "blog not found", data: [] });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, data: [] });
  }
};

module.exports = {
  getBlogs,
  createBlog,
  getBlogById,
  getBlogsByCategoryId,
  getBlogsByAuthorId,
  updateBlogById,
  deleteBlogById,
};
