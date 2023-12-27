const UserModel = require("../Models/Users");
const SaveUsers = async (req, res) => {
  const values = [
    req.body.username,
    req.body.email,
    req.body.password,
    // req.file.filename,
  ];
  console.log(values);
  try{
    const saveUser=new UserModel(req.body)
    const saveUsers= await saveUser.save()
    res.status(201).json("inserted Successfully")
  }
  catch(e){
    res.status(201).json(e);
  }
};

const getUsers=async (req,res)=>{
  try {
    const users= await UserModel.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send(e)
  }
}

const getIdUser = async (req, res) => {
  try {
    const userId=req.params.id
    const users = await UserModel.findById(userId);
    if(!users) res.status(404).send('user not find')
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const users = await UserModel.findByIdAndUpdate(userId,req.body,{
      new:true,
      runValidators:true
    });
     if (!users) res.status(404).send("user not find");
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
};

const DestroyUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const users = await UserModel.findByIdAndDelete(userId);
    if (!users) res.status(404).json("user not find");
    res.status(200).json('destroyed successfuly')
  } catch (e) {
    res.status(500).json(e);
  }
};

const CustomUpdate = async (req, res) => {
  const updatedInfo=Object.keys(req.body)

  const userId = req.params.id;
  try {
    const users = await UserModel.findById(userId);
    updatedInfo.forEach((update) => users[update]=req.body[update]);
    await users.save()
    if (!users) res.status(404).json("user not find");
    res.status(200).json('user updated successfully');
  
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  SaveUsers,
  getUsers,
  getIdUser,
  updateUser,
  DestroyUser,
  CustomUpdate,
};
