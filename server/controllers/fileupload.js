// const File = require("../model/File");
const Image = require("../model/Image");
const User = require("../model/User");
const Video = require("../model/Video");

const folder = process.env.FOLDER;

const {
  uploadimageToCloudinary,
  uploadVideoToCloudinary,
} = require("../config/cloudinary");

const imageUpload = async (req, res) => {
  try {
    const email = req.user.email;
    if (!req.files || !req.files.imageFile) {
      return res.status(400).send("No image received");
    }

    if (!email) {
      return res.status(400).send("No email received");
    }

    let imageFiles = Array.isArray(req.files.imageFile)
      ? req.files.imageFile
      : [req.files.imageFile];
    const fileTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!req.files || !req.files.imageFile) {
      return res.send("no image recieved");
    }

    for (let image of imageFiles) {
      if (!fileTypes.includes(image.mimetype))
        return res.send("Image formats supported: JPG, PNG, JPEG");

      const cloudFile = await uploadimageToCloudinary(
        image.tempFilePath,
        folder
      );
      const ImageData = await Image.create({
        cloudinaryId: cloudFile.public_id.toString(),
        name: image.name,
        email: email,
        imageUrl: cloudFile.secure_url,
      });

      if (!ImageData) {
        return res.status(401).send({
          success: false,
          message: "error while creating image db",
        });
      }
      const user = await User.findOneAndUpdate(
        { email: email },
        {
          $push: {
            Images: ImageData._id,
          },
        },
        { new: true }
      );

      if (!user) {
        return res.status(401).send({
          success: false,
          message: "error while adding image to user db",
        });
      }
    }
    //db entry
    const user = await User.findOne({ email: email })
      .populate("Images")
      .populate("Videos")
      .exec();
    return res.status(200).send({
      success: true,
      user,
      message: "image uploaded succesfully 2",
    });
  } catch (error) {
    console.log(error);
  }
};

const videoUpload = async (req, res) => {
  try {
    const email = req.user.email;
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email not retrieved",
      });
    }

    let videoFiles = Array.isArray(req.files.videoFile)
      ? req.files.videoFile
      : Array(req.files.videoFile);
    const fileTypes = ["video/mp4", "video/mkv", "video/mov"];

    if (!req.files || !req.files.videoFile) {
      return res.send("no image recieved");
    }

    for (let video of videoFiles) {
      if (!fileTypes.includes(video.mimetype.toLowerCase()))
        return res.send("Image formats supported: JPG, PNG, JPEG");

      const cloudFile = await uploadVideoToCloudinary(video.tempFilePath);

      const videoData = await Video.create({
        cloudinaryId: cloudFile.public_id.toString(),
        name: video.name,
        email: email,
        videoUrl: cloudFile.secure_url,
      });

      if (!videoData) {
        return res.status(401).send({
          success: false,
          message: "error while creating image db",
        });
      }
      const user = await User.findOneAndUpdate(
        { email: email },
        {
          $push: {
            Videos: videoData._id,
          },
        },
        { new: true }
      );

      if (!user) {
        return res.status(401).send({
          success: false,

          message: "error while adding image to user db",
        });
      }
    }
    //db entry
    const user = await User.findOne({ email: email })
      .populate("Images")
      .populate("Videos")
      .exec();
    return res.status(200).send({
      success: true,
      user,
      message: "image uploaded succesfully 2",
    });
  } catch (error) {
    res.send(error);
  }
};

module.exports = { imageUpload, videoUpload };
