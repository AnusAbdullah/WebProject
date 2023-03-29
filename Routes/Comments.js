const express = require("express");
// const { route } = require("express/lib/application");

const {
  addCmnts,
  updateCmnts,
  deleteCmnts,
  findCmnts,
} = require("../Controllers/Comments");

const router = express.Router();

router
  .get("/", findCmnts)
  .post("/", addCmnts)
  .put("/", updateCmnts)
  .delete("/", deleteCmnts);

module.exports = router;
