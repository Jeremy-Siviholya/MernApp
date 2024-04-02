const TrajetModel = require("../Models/Trajet");


const saveTrajet = async (req, res) => {
  const savetrajet = new TrajetModel(req.body);
  try {
    await savetrajet.save()
    res.status(200).json("inserted Successfully");
  } catch (e) {
    res.status(500).json(e);
  }
};

const UpdateTrajet = async (req, res) => {
  try {
    const id = req.params.id;
    const trajet = await TrajetModel.findByIdAndUpdate(id,req.body, {
      new: true,
      runValidators: true,
    });
    if (!trajet) res.status(404).send("trajet not find");
    res.status(200).json("Updated successfully");
  } catch (e) {
    res.status(500).send(e);
  }
};


const destroyTrajet = async (req, res) => {
  try {
    const id = req.params.id;
         await TrajetModel.findByIdAndDelete(id);
         res.status(200).json("destroyed successfuly");
  } catch (e) {
    res.status(500).json(e);
  }
};

const getTrajet = async (req, res) => {
  try {
    const client = await TrajetModel.find({});
    res.send(client);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getSingleTrajet = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await TrajetModel.findById(id);
    if (!client) res.status(404).send("trajet not find");
    res.send(client);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  saveTrajet,
  destroyTrajet,
  UpdateTrajet,
  getTrajet,
  getSingleTrajet
};




