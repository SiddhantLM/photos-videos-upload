const express = require("express");
const { imageUpload } = require("../controllers/fileupload");
const { showAllImages } = require("../controllers/showAll");
const { deleteImage } = require("../controllers/fileDelete");
const { isAuth } = require("../middlewares/auth");
const router = express.Router();

router.post("/uploadImages", isAuth, imageUpload);
router.post("/showAllImages", isAuth, showAllImages);
router.post("/deleteImage", isAuth, deleteImage);

module.exports = router;
