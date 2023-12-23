const express = require("express");
const {
  SaveUsers,
  getUsers,
  getIdUser,
  updateUser,
  DestroyUser,
} = require("../Controllers/Users");
const router = new express.Router();
router.post("/SaveUsers", SaveUsers);
router.get("/getUsers", getUsers);
router.get("/getUsers/:id", getIdUser);
router.patch("/updateUser/:id", updateUser);
router.delete("/destroyUser/:id", DestroyUser);

module.exports = router;
