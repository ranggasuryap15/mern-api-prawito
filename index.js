const express = require("express");
const app = express();

const productRoutes = require("./src/routes/products");

app.use("/", productRoutes);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
