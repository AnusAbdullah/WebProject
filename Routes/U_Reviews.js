const express = require("express");
// const { route } = require("express/lib/application.js");

const {
  addU_Review,
  updateU_Review,
  deleteU_Review,
  findU_Review,
} = require("../Controllers/U_Reviews");

const router = express.Router();

router
  .get("/",findU_Review)
  .post("/",addU_Review)
  .put("/",updateU_Review)
  .delete("/",deleteU_Review);
