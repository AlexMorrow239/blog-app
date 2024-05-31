const express = require("express");
const router = express.Router();

const blogController = require("../controllers/Blogs.js");

/**
 * POST /api/blogs/
 */
router.post("/", (req, res) => {
  blogController.createBlogs(req, res);
});

/** GET /api/blogs/ */
router.get("/", (req, res) => {
  blogController.getBlogs(req, res);
});

/**
 * GET /api/blogs/:id
 */
router.get("/:id", (req, res) => {
  blogController.getBlogByID(req, res);
});

/**
 * GET /api/blogs/category/:id
 */
router.get("/category/:id", (req, res) => {
  blogController.getBlogsByCategoryID(req, res);
});

/**
 * PUT /api/blogs/:id
 */
router.put("/:id", (req, res) => {
  blogController.updateBlogByID(req, res);
});

/**
 * DELETE /api/blogs/:id
 */
router.delete("/:id", (req, res) => {
  blogController.deleteBlogById(req, res);
});

router.get("/author/:id", (reg, res) => {
  blogController.getBlogsByAuthorId(req, res);
});

module.exports = router;
