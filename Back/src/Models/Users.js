const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password:{
    type:String,
    required:true
  }
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
