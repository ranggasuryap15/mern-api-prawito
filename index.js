const express = require("express");
const app = express();

const productRoutes = require("./src/routes/products");

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

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
