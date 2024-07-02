const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const GoogleCloudService = require("../services/cloud-storage");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // expiresIn: "1d",
  });
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, bio, password } = req.body;
    //check payload
    if (!firstName || !lastName || !email || !bio || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    // check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create new user
    const user = new User({
      firstName,
      lastName,
      email,
      bio,
      password: hashedPassword,
    });
    const newUser = await user.save();
    let resUser = newUser.toJSON();
    resUser.token = generateToken(resUser._id);
    delete resUser.password;
    res.status(201).json({ message: "New user created!", data: resUser });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check payload
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }
    // check hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    // remove password from response
    let resUser = user.toJSON();
    resUser.token = generateToken(resUser._id);
    delete resUser.password;
    res.status(201).json({ message: "Login successful!", data: resUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User found", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    let imageUrl = "";
    if (req?.file?.path) {
      imageUrl = await GoogleCloudService.uploadToFirebaseStorage(
        req?.file?.path,
        req?.file?.path
      );
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (
      user.image !==
        "https://storage.googleapis.com/ix-blog-app/download.png" &&
      req?.file?.path
    ) {
      // Take the URL, get the last segment, and remove the query parameters
      const encodedFileName = user.image.split("/").pop().split("?")[0];
      const decodedFileName = decodeURIComponent(encodedFileName); // Decode the URL
      await GoogleCloudService.deleteFromFirebaseStorage(decodedFileName);
    }

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.bio = req.body.bio || user.bio;
    user.image = imageUrl || user.image || undefined;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await user.save();
    res.status(200).json({ message: "User updated", data: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  getUser,
  updateUser,
};
// Path: backend/src/routes/Auth.js
