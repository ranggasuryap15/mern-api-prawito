const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// controller
const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");

app.use(bodyParser.json()); // menerima tipe json

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

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
