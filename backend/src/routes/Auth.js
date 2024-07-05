const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/Multer");

const { login, register, getUser, updateUser } = require("../controllers/Auth");
/**
 * @route POST api/auth/login
 * @description Login User
 */
router.post("/login", (req, res) => {
  login(req, res);
});

/**
 * @route POST api/auth/register
 * @description Register User
 */
router.post("/register", upload.single("image"), (req, res) => {
  register(req, res);
});

/**
 * @route GET api/auth/user/:id
 * @description Get User by ID
 */
router.get("/user/:id", (req, res) => {
  getUser(req, res);
});

/**
 * @route PUT api/auth/user/:id
 * @description Update User by ID
 */
router.put("/user/:id", upload.single("image"), (req, res) => {
  updateUser(req, res);
});

module.exports = router;
