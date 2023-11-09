exports.createProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;

  res.json({
    message: "Create Product Success",
    data: {
      id: 1,
      name: name,
      price: price,
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
