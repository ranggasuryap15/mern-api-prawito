exports.createProduct = (req, res, next) => {
  res.json({
    message: "Create Product",
    data: {
      id: 1,
      name: "Supreme T-Shirt",
      price: 99.99,
    },
  });
  next();
};

exports.getAllProduct = (req, res, next) => {
  res.json({
    message: "Get All message success",
    data: [
      {
        id: 1,
        name: "Supreme T-Shirt",
        price: 99.99,
      },
    ],
  });
  next();
};
