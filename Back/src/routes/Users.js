const express = require("express");
const { SaveUsers } = require("../Controllers/Users");
const router = new express.Router();
router.post("/SaveUsers", SaveUsers);

module.exports = router;
