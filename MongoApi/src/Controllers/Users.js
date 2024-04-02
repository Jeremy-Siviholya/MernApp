const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../Models/Users");

const salt = 10;

const saveUser =async (req, res) => {
  const values = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    // picture: req.file?.filename,
  };

  const saveUser = new UserModel(values);
  try {
    const AuthToken = await saveUser.generateAuthTokenAndSaveUser();
    res.status(201).json("inserted Successfully");
    // res.status(201).send({ saveUser, AuthToken });
  } catch (e) {
    res.status(500).json("email already exist");
  }




};


const getIdUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const users = await UserModel.findById(userId);
    if (!users) res.status(404).send("user not find");
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
};

const updateUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 8);
  const values = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    picture: req.file?.filename,
  };
  try {
    const userId = req.params.id;
    const users = await UserModel.findByIdAndUpdate(userId, values, {
      new: true,
      // runValidators: true,
    });
    if (!users) res.status(404).send("user not find");
    res.status(200).json("Updated successfully");
  } catch (e) {
    res.status(500).send(e);
  }
};

const DestroyUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await UserModel.findByIdAndDelete(userId).then((result)=>{
      // fs.unlinkSync(`../../public/images/${result.picture}`)
      res.status(200).json("destroyed successfuly");
      // console.log(result.picture);
    });
    // if (!users) res.status(404).json("user not find");
    // res.status(200).json("destroyed successfuly");
  } catch (e) {
    res.status(500).json(e);
  }
};

const CustomUpdate = async (req, res) => {
  const values = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    picture: req.file?.filename,
  };
  const updatedInfo = Object.keys(values);

  const userId = req.params.id;
  try {
    const users = await UserModel.findById(userId);
    updatedInfo.forEach((update) => (users[update] = values[update]));
    await users.save();
    if (!users) res.status(404).json("user not find");
    res.status(200).json("updated successfully");
  } catch (e) {
    res.status(500).json(e);
  }
};

const login =async (req, res) => {
  try {
    const user = await UserModel.findUser(req.body.username, req.body.password);
    res.send(user);
    if (!user) res.status(201).send("user not find");
  } catch (e) {
    res.status("400").send("username or password not valid");
  }
};




const getUsers =async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }

};


const verifytoken= (req, res, next) => {
  res.clearCookie('token');
  next();
};

// Route to handle user logout and clear the cookie

const Logout=(req, res) => {
  // Perform any other logout actions here
  // res.status(200).send({ message: 'Cookie cleared and user logged out successfully' });
}

module.exports = {
  saveUser,
  login,
  verifytoken,
  getUsers,
  Logout
};
