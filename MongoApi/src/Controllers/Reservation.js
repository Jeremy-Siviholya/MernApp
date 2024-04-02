
const moment = require("moment");
const ReserveModel = require("../Models/Reserve");


const saveReserve =async (req, res) => {
  let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

  const values = {
    refClient: req.body.refClient,
    refEngin:req.body.refEngin,
    refTrajet:req.body.refTrajet,
    dateReservation:date,
    username:req.body.username
  };

  try {
  let reser=new ReserveModel()

  reser.clients=[values.refClient]
  reser.flights=[values.refEngin]
  reser.trajets=[values.refTrajet]
  reser.dateReservation=values.dateReservation
  reser.username=values.username



  // const reserve = new ReserveModel(values);

    await reser.save()
    res.status(200).json("inserted Successfully");
  } catch (e) {
    res.status(500).json(e);
  }
};

const UpdateReserve =async (req, res) => {
  const values = {
    clients:[req.body.refClient],
    flights:[req.body.refEngin],
    trajets:[req.body.refTrajet],
    username:req.body.username
  };



  try {
    const id = req.params.id;
    const reserve = await ReserveModel.findByIdAndUpdate(id,values, {
      new: true,
      runValidators: true,
    });
    if (!reserve) res.status(404).send("reserve not find");
    res.status(200).json("Updated successfully");
  } catch (e) {
    res.status(500).send(e);
  }
};


const destroyReserve =async (req, res) => {
  try {
    const id = req.params.id;
         await ReserveModel.findByIdAndDelete(id);
         res.status(200).json("destroyed successfuly");
  } catch (e) {
    res.status(500).json(e);
  }
};


const getHistoryDestroyed = (req, res) => {
  // const sql = "select * from reservedestroyed";
  // db.query(sql, (err, result) => {
  //   if (err) return res.status(200).json(err);

  //   return res.send(result);
  // });
};

const getHistorysumDestroyed = (req, res) => {
 
};


const getReserves =async (req, res) => {
  try {
    const reserve = await ReserveModel.find({});
    res.send(reserve);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getSingleReserve =async (req, res) => {
  try {
    const id = req.params.id;
    const reserve = await ReserveModel.findById(id).populate('clients').populate('flights').populate('trajets');
    if (!reserve) res.status(404).send("trajet not find");
    res.send(reserve);
  } catch (e) {
    res.status(500).send(e);
  }
};


const getListReserve =async (req, res) => {
  try {
    const reserve = await ReserveModel.find({}).populate('clients').populate('flights').populate('trajets');
    res.send(reserve);
  } catch (e) {
    res.status(500).send(e);
  }



  };


  const getSingleListReserve =async (req, res) => {

  };


  const getDailyreport = (req, res) => {
  
  };

module.exports = {
  getDailyreport,
  saveReserve,
  destroyReserve,
  UpdateReserve,
  getReserves,
  getSingleReserve,
  getListReserve,
  getSingleListReserve,
  getHistoryDestroyed,
  getHistorysumDestroyed
};
