const mongoose = require("mongoose");
require("dotenv").config();

const Connectdb = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("db connected");
};

module.exports = {
  Connectdb,
};
