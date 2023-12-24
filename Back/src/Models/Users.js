const mongoose = require("mongoose");
const bcrypt=require('bcryptjs')

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password:{
    type:String,
    required:true,
    // validate(v){
    //   if(!v.lenght<3 )
    //   {

    //   }
    // }
  }
});

UserSchema.pre('save',async function(){
  if(this.isModified('password')) this.password = await bcrypt.hash(this.password,8)
})
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
