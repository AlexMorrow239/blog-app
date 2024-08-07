const Category = require("../models/Category");
const Blog = require("../models/Blog");

const createCategory = async (req, res) => {
  try {
    const sameCategory = await Category.find({ title: req.body.title });
    if (sameCategory.length > 0) {
      return res
        .status(409)
        .json({ message: "Category already exists!", data: [] });
    }

    const category = new Category({
      title: req.body.title,
      description: req.body.description,
      color: req.body.color,
    });
    const newCategory = await category.save();
    const categoryRes = await Category.findById(newCategory._id);
    res
      .status(201)
      .json({ message: "New category created!", data: categoryRes });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res
      .status(200)
      .json({ message: "Returned all categories!", data: categories });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const getCategoryById = async (req, res) => {
  res.status(200).json({
    message: "Got category by ID!",
    data: [],
  });
};

const updateCategoryByID = async (req, res) => {
  try {
    if (req.body.title) {
      const sameCategory = await Category.find({ title: req.body.title });
      for (let i = 0; i < sameCategory.length; i++) {
        if (sameCategory[i]._id != req.params.id) {
          return res
            .status(409)
            .json({ message: "Category already exists!", data: [] });
        }
      }
    }
    const category = await Category.findById(req.params.id);
    if (category) {
      category.title = req.body.title || category.title;
      category.description = req.body.description || category.description;
      category.color = req.body.color || category.color;
      const updatedCategory = await category.save();
      res
        .status(200)
        .json({ message: "Category updated!", data: updatedCategory });
    } else {
      res.status(404).json({ message: "Category not found!", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const deleteCategoryByID = async (req, res) => {
  try {
    const blog = await Blog.findOne({ categoryIds: req.params.id });
    if (blog) {
      return res
        .status(412)
        .json({ message: "Can't delete category still associated with blogs" });
    }

    const category = await Category.findByIdAndDelete(req.params.id);
    if (category) {
      res.status(200).json({ message: "Category deleted!", id: req.params.id });
    } else {
      res.status(404).json({ message: "Category not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const categoryController = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryByID,
  deleteCategoryByID,
};

module.exports = categoryController;
