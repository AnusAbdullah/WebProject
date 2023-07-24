const express = require("express");

const {
  addUser,
  updateUser,
  deleteUser,
  findUser,
  signIn,
  Profile,
  validateToken,
} = require("../Controllers/User");

const router = express.Router();

router
  .get("/", findUser)
  .post("/", addUser)
  .put("/", updateUser)
  .delete("/", deleteUser);

router.get("/signin", signIn);
// router.get("/profile", validateToken, Profile);

module.exports = router;
