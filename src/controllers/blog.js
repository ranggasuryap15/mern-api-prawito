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
