const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products");

// CREATE PRODUCT
router.post("/products", productsController.createProduct);

// READ
router.get("/products", productsController.getAllProduct);

module.exports = router;
