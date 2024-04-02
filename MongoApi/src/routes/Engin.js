const express = require("express");
const router = new express.Router();

const {
    saveEngin,
    destroyEngin,
    UpdateEngin,
    getEngins,
    getSingleEngin,
    getListEngins,
    getSingleListEngin
} = require("../controllers/Engin");

router.post("/saveEngin", saveEngin);
router.get("/getEngins", getEngins);
router.get("/getEngins/:id", getSingleEngin);
router.get("/getListEngins", getListEngins);
router.get("/getListEngins/:id", getSingleListEngin);
router.put("/UpdateEngins/:id", UpdateEngin);
router.delete("/destroyEngins/:id", destroyEngin);

module.exports = router;