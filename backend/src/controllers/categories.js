const Category = require("../models/categoryModel");

const getCategories = async (req, res) => {
  try {
    const categoriesRes = await Category.find();
    if (!categoriesRes) {
      res.status(404).json({ message: "categories not found", data: [] });
    }
    res
      .status(201)
      .json({ message: "Get all categories", data: categoriesRes });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.status(201).json({ message: "get a category by id", data: category });
    } else {
      res.status(404).json({ message: "category not found", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = new Category({
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      color: req.body.color,
    });
    const categoryRes = await category.save();
    res.status(201).json({ message: "create a category", data: categoryRes });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      category.id = req.body.id || category.id;
      category.title = req.body.title || category.title;
      category.description = req.body.description || category.description;
      category.color = req.body.color || category.color;

      const categoryRes = await category.save();
      res.status(200).json({ message: "update a category", data: categoryRes });
    } else {
      res.status(404).json({ message: "category not found", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (category) {
      res.status(200).json({ message: "delete a category", data: category });
    } else {
      res.status(404).json({ message: "category not found", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategoryById,
};
