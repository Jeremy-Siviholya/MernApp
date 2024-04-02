const express = require("express");
const router = new express.Router();

const {
  saveClients,
  destroyClient,
  UpdateClients,
  getClients,
  getSingleClient,

} = require("../controllers/Clients");

router.post("/saveClients", saveClients);
router.get("/getClients", getClients);
router.get("/getClients/:id", getSingleClient);
router.put("/UpdateClients/:id", UpdateClients);
router.delete("/destroyClient/:id", destroyClient);

module.exports = router;