const UserModel = require("../Models/Users");
const SaveUsers = async (req, res) => {
  try{
    const saveUser=new UserModel(req.body)
    const saveUsers= await saveUser.save()
    res.status(201).send(saveUsers)
  }
  catch(e){
    res.status(201).send(e);
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
    if (!users) res.status(404).send("user not find");
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { SaveUsers, getUsers, getIdUser, updateUser, DestroyUser };
