const express = require("express");
const router = new express.Router();

const {
    getcountclients,
    getcountFlight,
    getcountreserve
} = require("../controllers/Stats");


router.get("/getcountclients", getcountclients);
router.get("/getcountFlight", getcountFlight);
router.get("/getcountreserve", getcountreserve);


module.exports = router;