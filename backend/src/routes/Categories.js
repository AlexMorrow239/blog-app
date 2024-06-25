const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/Category");

const { protect } = require("../middleware/Auth");

router.post("/", protect, (req, res) => {
  categoryController.createCategory(req, res);
});

router.get("/", (req, res) => {
  categoryController.getCategories(req, res);
});

router.put("/:id", protect, (req, res) => {
  categoryController.updateCategoryByID(req, res);
});

router.delete("/:id", protect, (req, res) => {
  categoryController.deleteCategoryByID(req, res);
});

module.exports = router;
