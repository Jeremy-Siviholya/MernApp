const express = require("express");
const { UserSchema } = require("../Controlers/Users");
const router = new express.Router();

router.get("/", UserSchema);

module.exports = router;
