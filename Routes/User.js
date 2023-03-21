const express = require("express");
// const { route, del } = require("express/lib/application");

const {
  addUser,
  updateUser,
  deleteUser,
  findUser,
} = require("../Controllers/User");

const router = express.Router();

router
  .get("/", findUser)
  .post("/", addUser)
  .put("/", updateUser)
  .delete("/", deleteUser);
