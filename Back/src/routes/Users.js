const express = require("express");
const getUsers = require("../Controllers/Users");
const router = new express.Router();

router.get("/getUsers", getUsers);

module.exports = router;
