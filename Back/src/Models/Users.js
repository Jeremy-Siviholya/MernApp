const mongoose = require("mongoose");
const bcrypt=require('bcryptjs')
const validator=require('validator')

const UserSchema = new mongoose.Schema({
  username: {
    type:String,
    required:true,
  },

  email: {
    type:String,
    required:true,
    validate(v){
      if(!validator.isEmail(v)) throw new Error('email invalide')
    }
  },
  password:{
    type:String,
    required:true,
    validate(v){
      if(v < 3 && v>15 ) throw new Error('taille invalide')
    }
  },
   picture:{
    type:String,
    required:false
  }

  
});

UserSchema.pre('save',async function(){
  if(this.isModified('password')) this.password = await bcrypt.hash(this.password,8)
})
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
