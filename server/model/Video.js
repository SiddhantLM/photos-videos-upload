// const { text } = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

//h
const videoSchema = new mongoose.Schema({
  cloudinaryId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

videoSchema.post("save", (doc) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: "image-video-upload",
    to: doc.email,
    subject: "File uploaded",
    html: `<h1>Your file has been saved</h1> <p>Thank you for using our services</p><p>Your image is saved here : </p><a href=${doc.imageUrl}>${doc.name}</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
});

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
