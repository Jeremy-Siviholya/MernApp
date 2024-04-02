const express = require("express");
const router = new express.Router();

const {
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
} = require("../Controllers/Reservation");

router.post("/saveReserve", saveReserve);
router.get("/getReserves", getReserves);
router.get("/getHistoryDestroyed", getHistoryDestroyed);
router.get("/getHistorysumDestroyed", getHistorysumDestroyed);
router.get("/getDailyreports/:dateReservation", getDailyreport);
router.get("/getReserves/:id", getSingleReserve);
router.get("/getListReserve", getListReserve);
router.get("/getListReserve/:id", getSingleListReserve);
router.put("/UpdateReserve/:id", UpdateReserve);
router.delete("/destroyReserve/:id", destroyReserve);

module.exports = router;