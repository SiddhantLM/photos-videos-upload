const express = require("express");
const { videoUpload } = require("../controllers/fileupload");
const { showAllVideos } = require("../controllers/showAll");
const { deleteVideo } = require("../controllers/fileDelete");
const { isAuth } = require("../middlewares/auth");
const router = express.Router();

router.post("/uploadVideos", isAuth, videoUpload);
router.post("/showAllVideos", showAllVideos);
router.post("/deleteVideo", deleteVideo);

module.exports = router;
