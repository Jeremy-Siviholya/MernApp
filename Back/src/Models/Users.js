const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    validate(v) {
      if (!validator.isLength(v, { min: 3, max: 12 }))
        throw new Error("Le username doit etre entre 3 et 12 caracteres");
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(v) {
      if (!validator.isEmail(v)) throw new Error("email invalide");
    },
  },
  password: {
    type: String,
    required: true,
    validate(v) {
      if (!validator.isLength(v, { min: 3, max: 15 }))
        throw new Error("Le mot de passe doit etre entre 3 et 15 caracteres");
    },
  },
  picture: {
    type: String,
  },
});

UserSchema.statics.findUser = async (email, password) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new mongoose.Error("user not find");
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("password not valid");
  return user;
};

UserSchema.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 8);
});
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
