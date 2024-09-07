const express = require("express");

const router = express.Router();

const { imageUpload, videoUpload } = require("../controllers/fileupload");
console.log("reached fileupload router");
//api route
// router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);

module.exports = router;
