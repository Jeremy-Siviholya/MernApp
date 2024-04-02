const express = require("express");
const router = new express.Router();

const {
  savePay,
  destroyPay,
  UpdatePay,
  getPays,
  getSinglePay,
  getListPay,
  getSingleListPay,
  getDailyreport
} = require("../controllers/Paiement");

router.post("/savePay", savePay);
router.get("/getPays", getPays);
router.get("/getPays/:id", getSinglePay);
router.get("/getListPay", getListPay);
router.get("/getdailReportPay/:datePaiement", getDailyreport);
router.get("/getListPay/:id", getSingleListPay);
router.put("/UpdatePay/:id", UpdatePay);
router.delete("/destroyPay/:id", destroyPay);

module.exports = router;
