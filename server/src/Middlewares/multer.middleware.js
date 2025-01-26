const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const allowedFileTypes = ["images/jpg", "image/png", "image/jpeg"];

    if (!allowedFileTypes.includes(file.mimetype)) {
      cb(new Error("This filetype is not accepted"));
      return;
    }
    cb(null, "./storage");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//Instead of saving files to a folder, use memory storage to temporarily store files in memory. This avoids the need for a persistent file system.
const uploadImage = multer({ storage: multer.memoryStorage() });
module.exports = uploadImage;
