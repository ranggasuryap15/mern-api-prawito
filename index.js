const express = require("express");

const app = express();

app.use(() => {
  console.log("We got a new request");
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
