const express = require("express");
const multer = require("multer");
const { afterUploadImage, uploadPost } = require("../controllers/post");
const { isLoggedIn } = require("../middlewares");
const fs = require("fs");
const path = require("path");

try {
  fs.readdirSync("uploads");
} catch (error) {
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const router = express.Router();
router.post("/img", isLoggedIn, upload.single("img"), afterUploadImage);
const upload2 = multer();
router.post("/", isLoggedIn, upload2.none(), uploadPost);

module.exports = router;
