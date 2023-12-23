const UserModel = require("../Models/Users");
const SaveUsers = async (req, res) => {
 const user=new UserModel(req.body)
 const saveUser= await user.save()
 res.send(saveUser)
};

module.exports = { SaveUsers };
