const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Public/temp");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadImage = multer({ storage });
module.exports = uploadImage;
