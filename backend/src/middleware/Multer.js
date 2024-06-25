const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    switch (req.baseUrl) {
      case "/api/blogs":
        cb(null, "uploads/blogs/");
        break;
      case "/api/auth":
        cb(null, "uploads/users/");
        break;
      default:
        cb(null, "uploads/");
        break;
    }
  },
  filename: function (req, file, cb) {
    let fileExt = file.originalname.split(".").pop();
    let fileName = Date.now() + "." + fileExt;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10, // 5MB max file size
  },
});

module.exports = { upload };
