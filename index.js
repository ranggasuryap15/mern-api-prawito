const express = require("express");

const app = express();
const router = express.Router();

// GET '/users' => [{name: 'John'}, {name: 'Jane'}]
router.use("/users", (req, res, next) => {
  res.json([{ name: "John" }, { name: "Jane" }]);
});

router.use("/price", (req, res, next) => {
  res.json({ price: 10 });
});

router.get("/", (req, res, next) => {
  res.json({ message: "Hello World" });
});

app.use("/", router);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
