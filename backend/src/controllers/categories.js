const getCategories = (req, res) => {
  res.status(200).json({ message: "Get all categories", data: [] });
};

const createCategory = (req, res) => {
  res.status(200).json({ message: "create a category", data: [] });
};

const updateCategory = (req, res) => {
  res.status(200).json({ message: "update a category", data: [] });
};

const deleteCategoryByID = (req, res) => {
  res.status(200).json({ message: "delete a category by ID", data: [] });
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategoryByID,
};
