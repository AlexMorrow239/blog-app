const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogs.js");

/** GET /api/blogs/ */
router.get("/", (req, res) => {
  blogController.getBlogs(req, res);
});

/**
 * POST /api/blogs/
 */
router.post("/", (req, res) => {
  blogController.createBlog(req, res);
});

/**
 * PUT /api/blogs/
 */
router.put("/", (req, res) => {
  res.status(101).send("No function");
});

/**
 * DELETE /api/blogs/
 */
router.delete("/", (req, res) => {
  res.status(101).send("No function");
});

/**
 * GET /api/blogs/:id
 */
router.get("/:id", (req, res) => {
  blogController.getBlogById(req, res);
});

/**
 * POST /api/blogs/:id
 */
router.post("/:id", (req, res) => {
  res.status(101).send("No function");
});

/**
 * PUT /api/blogs/:id
 */
router.put("/:id", (req, res) => {
  blogController.updateBlogById(req, res);
});

/**
 * DELETE /api/blogs/:id
 */
router.delete("/:id", (req, res) => {
  blogController.deleteBlogById(req, res);
});

/**
 * GET /api/blogs/category/:id
 */
router.get("/category/:id", (req, res) => {
  blogController.getBlogsByCategoryId(req, res);
});

router.get("/author/:id", (reg, res) => {
  blogController.getBlogsByAuthorId(req, res);
});

module.exports = router;
