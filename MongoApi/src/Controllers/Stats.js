const ClientsModel = require("../Models/Clients");
const FlightModel = require("../Models/Flight");
const ReserveModel = require("../Models/Reserve");



const getcountFlight =async (req, res) => {
  try {
    const totalFlight = await FlightModel.countDocument()
    res.status(200).json({ totalFlight });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getcountclients =async (req, res) => {
  
  try {
    const totalClients = await ClientsModel.totalClients()
    res.status(200).json({ totalClients });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  };


  const getcountreserve = async (req, res) => {
    try {
      const TotalReserve = await ReserveModel.TotalReserve()
      res.status(200).json({ TotalReserve });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


module.exports = {
getcountclients,
getcountFlight,
getcountreserve
};
