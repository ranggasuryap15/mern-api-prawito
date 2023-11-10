const { validationResult } = require("express-validator");
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
  BlogPost.find()
    .then((result) => {
      res.status(200).json({
        message: "Data Blog Post berhasil diterima",
        data: result,
      });
    })
    .catch((err) => {
      next(err); // handle di middleware berikutnya
    });
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
