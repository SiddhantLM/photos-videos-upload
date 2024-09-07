const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const SECRET = process.env.JWT_SECRET;

const forgotPassMail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "user doesn't exist",
      });
    }

    const token = await jwt.sign({ email: user.email, id: user._id }, SECRET, {
      expiresIn: "24h",
    });

    // console.log(token);
    // user.resetPaswwordExpiry = Date.now() + 3600000;
    // user.token = token;

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
      to: email,
      subject: "File uploaded",
      html: `<h1>Reset your password</h1> <p>set your new password on this lionk</p><p>This is the link : </p><a href=http://localhost:3000/reset-pass/${token}>http://localhost:3000/reset-pass</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPaswwordExpiry: Date.now() + 3600000 },
      { new: true }
    );

    // console.log(updatedUser);
    // console.log(token);

    return res.status(200).send({
      success: true,
      message: "token sent successfully",
      token,
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "error while sending the token in mail",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;
    // console.log(password, "    ", token);
    if (!password || !token) {
      return res.status(401).send({
        success: false,
        message: "resertPassword data not recieved",
      });
    }

    const user = await User.findOne({ token: token });

    // await console.log(user);

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "invalid token or expired",
      });
    }

    // if (!(user.resetPaswwordExpiry > Date.now())) {
    //   return res.status(401).send({
    //     success: false,
    //     message: "validity expired",
    //   });
    // }
    const hashedPassword = await bcrypt.hash(password, 10);

    // await console.log(hashedPassword);

    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword, resetPasswordExpiry: null, token: null },
      { new: true }
    );
    // console.log(updatedUser);

    return res.status(200).send({
      success: true,
      message: "password changed",
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "error while resetting password",
    });
  }
};

module.exports = { resetPassword, forgotPassMail };
