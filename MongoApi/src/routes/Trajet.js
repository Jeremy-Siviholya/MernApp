const express = require("express");
const router = new express.Router();

const {
    saveTrajet,
  destroyTrajet,
  UpdateTrajet,
  getTrajet,
  getSingleTrajet
} = require("../controllers/Trajet");

router.post("/saveTrajet", saveTrajet);
router.get("/getTrajet", getTrajet);
router.get("/getTrajet/:id", getSingleTrajet);
router.put("/UpdateTrajet/:id", UpdateTrajet);
router.delete("/destroyTrajet/:id", destroyTrajet);

module.exports = router;