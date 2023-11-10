const { validationResult } = require("express-validator");

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

  const result = {
    message: "Create blog post success",
    data: {
      post_id: 1,
      title,
      image: "image-cover.jpg",
      body,
      created_at: "12/12/2020",
      author: {
        uid: 1,
        name: "Faza Ruziqyani Firdausa",
      },
    },
  };

  res.status(201).json(result);
};
