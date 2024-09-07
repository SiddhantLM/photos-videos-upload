// const { default: mongoose } = require("mongoose");
const Image = require("../model/Image");
const User = require("../model/User");
const cloudinary = require("cloudinary");
const Video = require("../model/Video");

const deleteImage = async (req, res) => {
  try {
    const { imageId, email } = req.body;

    if (!email) {
      return res.status(401).send({
        success: false,
        message: "email not recieved",
      });
    }

    if (!imageId) {
      return res.status(401).send({
        success: false,
        message: "image id was not recieved",
      });
    }

    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(401).send({
        success: false,
        message: "image not found",
      });
    }
    const cloudinaryResponse = await cloudinary.v2.uploader.destroy(
      image.cloudinaryId,
      {
        invalidate: true,
        resource_type: "image",
      }
    );

    if (!cloudinaryResponse) {
      return res.status(401).send({
        success: false,
        message: "error while deleting image from cloudinary",
      });
    }

    const user = await User.findOneAndUpdate(
      { email: email },
      {
        $pull: {
          Images: imageId,
        },
      },
      { new: true }
    )
      .populate("Images")
      .populate("Videos")
      .exec();
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "user not found",
      });
    }

    const imageDelete = await Image.findByIdAndDelete(imageId);

    if (!imageDelete) {
      return res.status(401).send({
        success: false,
        message: "error while deleting from db",
      });
    }

    return res.status(200).send({
      success: true,
      user,
      message: "image deleted",
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "error while deleting image",
    });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { videoId, email } = req.body;

    if (!videoId) {
      return res.status(401).send({
        success: false,
        message: "image id was not recieved",
      });
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(401).send({
        success: false,
        message: "image not found",
      });
    }
    const cloudinaryResponse = await cloudinary.v2.uploader.destroy(
      video.cloudinaryId,
      {
        invalidate: true,
        resource_type: "video",
      }
    );

    if (!cloudinaryResponse) {
      return res.status(401).send({
        success: false,
        message: "error while deleting image from cloudinary",
      });
    }

    const user = await User.findOneAndUpdate(
      { email: email },
      {
        $pull: {
          Videos: videoId,
        },
      },
      { new: true }
    )
      .populate("Images")
      .populate("Videos")
      .exec();
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "user not found",
      });
    }

    const imageDelete = await Video.findByIdAndDelete(videoId);

    if (!imageDelete) {
      return res.status(401).send({
        success: false,
        message: "error while deleting from db",
      });
    }

    return res.status(200).send({
      success: true,
      user,
      message: "image deleted",
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "error while deleting image",
    });
  }
};

module.exports = { deleteImage, deleteVideo };
