const moment = require("moment");
const PayModel = require("../Models/Pay");





const savePay =async (req, res) => {
  let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
  const values = {
    refReservation: req.body.refReservation,
    montant:req.body.montant,
    datePaiement:date,

  };
  try {
  let pay=new PayModel()

  pay.reserves=[values.refReservation]
  pay.montant=values.montant
  pay.datePaiement=values.datePaiement

  // const reserve = new ReserveModel(values);

    await pay.save()
    res.status(200).json("inserted Successfully");
  } catch (e) {
    res.status(500).json(e);
  }
};




const UpdatePay =async (req, res) => {
  const values = {
    reserves:[req.body.refReservation],
    montant:req.body.montant
  };

  try {
    const id = req.params.id;
    const reserve = await PayModel.findByIdAndUpdate(id,values, {
      new: true,
      runValidators: true,
    });
    if (!reserve) res.status(404).send("reserve not find");
    res.status(200).json("Updated successfully");
  } catch (e) {
    res.status(500).send(e);
  }
};


const destroyPay =async (req, res) => {
  try {
    const id = req.params.id;
         await PayModel.findByIdAndDelete(id);
         res.status(200).json("destroyed successfuly");
  } catch (e) {
    res.status(500).json(e);
  }
};

const getPays =async (req, res) => {
  try {
    const pays = await PayModel.find({})
    res.send(pays);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const getSinglePay =async (req, res) => {
  try {
    const id = req.params.id;
    const reserve = await PayModel.findById(id).populate('reserves')
    if (!reserve) res.status(404).send("trajet not find");
    res.send(reserve);
  } catch (e) {
    res.status(500).send(e);
  }
};



const getListPay =async (req, res) => {
  try {
    const pays = await PayModel.find({}).populate('reserves')
    res.send(pays);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};


  const getSingleListPay =async (req, res) => {
    try {
      const id = req.params.id;
      const reserve = await PayModel.findById(id).populate('reserves')
      if (!reserve) res.status(404).send("trajet not find");
      res.send(reserve);
    } catch (e) {
      res.status(500).send(e);
    }
  };


  const getDailyreport = (req, res) => {

  
  };

module.exports = {
  savePay,
  destroyPay,
  UpdatePay,
  getPays,
  getSinglePay,
  getListPay,
  getSingleListPay,
  getDailyreport
};
