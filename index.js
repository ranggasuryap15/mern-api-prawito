const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

// controller
const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// middleware
app.use(bodyParser.json()); // menerima tipe json
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("image")
);

// izinkan semua akses darimana pun
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// routes
app.use("/v1/auth", authRoutes);
app.use("/v1/blog", blogRoutes);

// middleware
app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message, data });
});

// connect to mongodb server
mongoose
  .connect(
    "mongodb+srv://ranggasuryap15:J3lnZ6fIFxnYbhXN@cluster0.clwldbv.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => console.log("Connection Success"));
  })
  .catch((err) => console.log(err));
