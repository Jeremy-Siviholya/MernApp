const mongoose = require("mongoose");
var con = mongoose
  .connect("mongodb://localhost:27017/manage", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("db connected"))
  .catch((err) => console.log(err));

module.exports = con;
