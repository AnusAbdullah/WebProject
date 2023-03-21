const express = require("express");
// const { route } = require("express/lib/application");

const {
  addAdmin,
  updateAdmin,
  deleteAdmin,
  findAdmin,
} = require("../Controllers/Admin");

const router = express.Router();

router
  .get("/", findAdmin)
  .post("/", addAdmin)
  .put("/", updateAdmin)
  .delete("/", deleteAdmin);