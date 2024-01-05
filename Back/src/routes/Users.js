const express = require("express");
const {
  SaveUsers,
  getUsers,
  getIdUser,
  updateUser,
  DestroyUser,
  CustomUpdate,
} = require("../Controllers/Users");
const upload = require("../Controllers/Upload");
const router = new express.Router();
router.post("/SaveUsers", upload.single("image"), SaveUsers);
router.get("/getUsers", getUsers);
router.get("/getUsers/:id", getIdUser);
// router.patch("/updateUser/:id", upload.single("image"), CustomUpdate);
router.patch("/updateUser/:id", upload.single("image"), updateUser);
router.delete("/destroyUser/:id", DestroyUser);

module.exports = router;
