const ClientsModel = require("../Models/Clients");


const saveClients = async (req, res) => {


  const saveclient = new ClientsModel(req.body);
  try {
    await saveclient.save()
    res.status(200).json("inserted Successfully");
  } catch (e) {
    res.status(500).json(e);
  }
};

const UpdateClients = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await ClientsModel.findByIdAndUpdate(id,req.body, {
      new: true,
      runValidators: true,
    });
    if (!client) res.status(404).send("client not find");
    res.status(200).json("Updated successfully");
  } catch (e) {
    res.status(500).send(e);
  }
};

const destroyClient = async (req, res) => {
  try {
    const id = req.params.id;
         await ClientsModel.findByIdAndDelete(id);
         res.status(200).json("destroyed successfuly");
  } catch (e) {
    res.status(500).json(e);
  }
};






const getClients = async (req, res) => {
  try {
    const client = await ClientsModel.find({});
    res.send(client);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getSingleClient = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await ClientsModel.findById(id);
    if (!client) res.status(404).send("client not find");
    res.send(client);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  saveClients,
  destroyClient,
  UpdateClients,
  getClients,
  getSingleClient,

};
