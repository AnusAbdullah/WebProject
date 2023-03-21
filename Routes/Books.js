const express = require("express");
// const { route } = require("express/lib/application");

const {
  addbook,
  updatebook,
  deletebook,
  findbook,
} = require("../Controllers/Books");

const router = express.Router();

router
  .get("/", findbook)
  .post("/", addbook)
  .put("/", updatebook)
  .delete("/", deletebook);
