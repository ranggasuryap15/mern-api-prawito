const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const productRoutes = require("./src/routes/products");
const authRoutes = require("./src/routes/auth");

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

app.use("/", productRoutes);
app.use("/v1/auth", authRoutes);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
