const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const BlogPost = require("../models/blog");

exports.createBlogPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("invalid value");
    error.errorStatus = 400;
    error.data = errors.array();

    throw error;
  }

  if (!req.file) {
    const error = new Error("Image must be uploaded");
    error.errorStatus = 422;
    throw error;
  }

  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;

  // posting to models BlogPost
  const Posting = new BlogPost({
    title,
    body,
    image,
    author: {
      uid: 1,
      name: "Rangga Surya Prayoga",
    },
  });

  Posting.save()
    .then((result) => {
      res.status(201).json({
        message: "Create blog post success",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.getAllBlogPost = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;

  BlogPost.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;

      // ambil data
      return BlogPost.find()
        .skip((parseInt(currentPage) - 1) * perPage)
        .limit(parseInt(perPage));
    })
    .then((result) => {
      res.status(200).json({
        message: "Data Blog Post berhasil diterima",
        data: result,
        total_data: totalItems,
        per_page: parseInt(perPage),
        current_page: parseInt(currentPage),
      });
    })
    .catch((err) => next(err));
};

exports.getBlogPostById = (req, res, next) => {
  const postId = req.params.id;
  BlogPost.findById(postId)
    .then((result) => {
      if (!result) {
        const error = new Error("Blog post tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "Data Blog Post berhasil diterima",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateBlogPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("invalid value");
    error.errorStatus = 400;
    error.data = errors.array();

    throw error;
  }

  if (!req.file) {
    const error = new Error("Image must be uploaded");
    error.errorStatus = 422;
    throw error;
  }

  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;
  const postId = req.params.id;

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Blog post tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }

      // remove image lama
      removeImage(post.image);

      // update
      post.title = title;
      post.body = body;
      post.image = image;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Update blog post berhasil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteBlogPost = (req, res, next) => {
  const postId = req.params.id;

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Blog post tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }

      removeImage(post.image);

      // delete
      return BlogPost.findByIdAndDelete(postId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Delete blog post berhasil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

// function
const removeImage = (filepath) => {
  filepath = path.join(__dirname, "../..", filepath);
  fs.unlink(filepath, (err) => console.log(err));
};
