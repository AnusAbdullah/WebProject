const express = require("express");

const {
  addUser,
  updateUser,
  deleteUser,
  findUser,
  SignIn,
  Profile,
  validateToken,
} = require("../Controllers/User");

const router = express.Router();

router
  .get("/", findUser)
  .post("/", addUser)
  .put("/", updateUser)
  .delete("/", deleteUser);

router.get("/signin", SignIn);
router.get("/profile", validateToken, Profile);

module.exports = router;
