const express = require("express");
const { saveUser, login, getUsers, verifytoken, Logout } = require("../Controllers/Users");
const router = new express.Router();


router.post("/saveUsers", saveUser);
router.post("/login", login);
router.get("/getUsers", getUsers);
router.delete("/logout",verifytoken,Logout);

module.exports = router;
