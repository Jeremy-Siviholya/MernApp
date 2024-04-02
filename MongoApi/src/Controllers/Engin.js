const FlightModel = require("../Models/Flight");


const saveEngin = async (req, res) => {
  const saveflight = new FlightModel(req.body);
  try {
    await saveflight.save()
    res.status(200).json("inserted Successfully");
  } catch (e) {
    res.status(500).json(e);
  }
};

const UpdateEngin = async (req, res) => {
  try {
    const id = req.params.id;
    const flight = await FlightModel.findByIdAndUpdate(id,req.body, {
      new: true,
      runValidators: true,
    });
    if (!flight) res.status(404).send("trajet not find");
    res.status(200).json("Updated successfully");
  } catch (e) {
    res.status(500).send(e);
  }
};


const destroyEngin = async (req, res) => {
  try {
    const id = req.params.id;
         await FlightModel.findByIdAndDelete(id);
         res.status(200).json("destroyed successfuly");
  } catch (e) {
    res.status(500).json(e);
  }
};

const getEngins =async (req, res) => {
  try {
    const client = await FlightModel.find({});
    res.send(client);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getListEngins =async (req, res) => {
  try {
    const client = await FlightModel.find({});
    res.send(client);
  } catch (e) {
    res.status(500).send(e);
  }
  };


  const getSingleListEngin =async (req, res) => {
    try {
      const id = req.params.id;
      const client = await FlightModel.findById(id);
      if (!client) res.status(404).send("trajet not find");
      res.send(client);
    } catch (e) {
      res.status(500).send(e);
    }
  };




const getSingleEngin =async (req, res) => {
  try {
    const id = req.params.id;
    const client = await FlightModel.findById(id);
    if (!client) res.status(404).send("trajet not find");
    res.send(client);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  saveEngin,
  destroyEngin,
  UpdateEngin,
  getEngins,
  getSingleEngin,
  getListEngins,
  getSingleListEngin
};
