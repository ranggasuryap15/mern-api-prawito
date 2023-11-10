const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");

exports.createBlogPost = (req, res, next) => {
  const title = req.body.title;
  // const image = req.body.image;
  const body = req.body.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("invalid value");
    error.errorStatus = 400;
    error.data = errors.array();

    throw error;
  }

  // posting to models BlogPost
  const Posting = new BlogPost({
    title,
    body,
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
