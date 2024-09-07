const mongoose = require("mongoose");
const Image = require("./Image");
const Video = require("./Video");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Images: [
    {
      type: mongoose.Types.ObjectId,
      ref: Image,
    },
  ],
  Videos: [
    {
      type: mongoose.Types.ObjectId,
      ref: Video,
    },
  ],
  profilePic: {
    type: String,
  },
  token: {
    type: String,
  },
  resetPaswwordExpiry: {
    type: Date,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
