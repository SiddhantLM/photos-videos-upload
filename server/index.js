//app create
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const imageRoutes = require("./routes/images");
const fileUpload = require("express-fileupload");
const cloudinary = require("./config/cloudinary");
const db = require("./config/database");
const authRoutes = require("./routes/auth");
const videoRoutes = require("./routes/videos");
const app = express();

//port
require("dotenv").config();
const port = process.env.PORT || 3000;

//middleware

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

//db connection

db.connect();

//cloudinary connect

cloudinary.cloudinaryConnect();

//route mounting
// const Upload = require("./routes/FileUpload");

// const bodyParser = require("body-parser");
app.use("/api/v1/images", imageRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/videos", videoRoutes);

//activate server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
