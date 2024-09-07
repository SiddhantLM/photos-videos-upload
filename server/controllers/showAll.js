const User = require("../model/User");

const showAllImages = async (req, res) => {
  try {
    // const { id } = req.user;
    const { email } = req.body;

    if (!email) {
      return res.this.status(401).send({
        success: false,
        message: "email not recieved",
      });
    }

    const images = [];

    const user = await User.findOne({ email: email }).populate("Images").exec();

    if (!user || !user.Images || user.Images.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No images found for this user",
      });
    }

    user.Images.map((image) => {
      images.push({
        cloudinaryId: image.cloudinaryId,
        id: image._id.toString(),
        name: image.name,
        url: image.imageUrl,
      });
      return 0;
    });

    return res.status(400).send({
      success: true,
      message: "images retrieved",
      images: images,
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "images couldn't be retrieved",
    });
  }
};

const showAllVideos = async (req, res) => {
  try {
    // const { id } = req.user;
    const { email } = req.body;

    if (!email) {
      return res.this.status(401).send({
        success: false,
        message: "email not recieved",
      });
    }

    const videos = [];

    const user = await User.findOne({ email: email }).populate("Videos").exec();

    if (!user || !user.Videos || user.Videos.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No images found for this user",
      });
    }

    user.Videos.map((image) => {
      videos.push({
        id: image._id.toString(),
        name: image.name,
        url: image.videoUrl,
        cloudinaryId: image.cloudinaryId,
      });
      return 0;
    });

    return res.status(400).send({
      success: true,
      message: "images retrieved",
      videos: videos,
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "images couldn't be retrieved",
    });
  }
};

module.exports = { showAllImages, showAllVideos };
