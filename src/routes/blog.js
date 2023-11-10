const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const blogController = require("../controllers/blog");

router.post(
  "/post",
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("Input title minimal 5 huruf"),
    body("body").isLength({ min: 5 }).withMessage("Input body minimal 5 huruf"),
  ],
  blogController.createBlogPost
);

router.get("/posts", blogController.getAllBlogPost);
router.get("/post/:id", blogController.getBlogPostById);
router.put(
  "/post/:id",
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("Input title minimal 5 huruf"),
    body("body").isLength({ min: 5 }).withMessage("Input body minimal 5 huruf"),
  ],
  blogController.updateBlogPost
);
router.delete("/post/:id", blogController.deleteBlogPost);

module.exports = router;
