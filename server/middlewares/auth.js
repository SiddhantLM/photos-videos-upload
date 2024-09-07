// const User = require("../model/User");
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const token =
      req.query?.token ||
      req.body?.token ||
      req.headers("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "token not recieved",
      });
    }

    try {
      const valid = await jwt.verify(token.toString(), process.env.JWT_SECRET);
      req.user = valid;
    } catch (error) {
      return res.status(401).send({
        success: false,
        message: "invalid token",
      });
    }
    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "error while authenticating",
    });
  }
};

module.exports = { isAuth };
