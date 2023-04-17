const express = require("express");
// const { route } = require("express/lib/application");

const {
  addCmnts,
  updateCmnts,
  deleteCmnts,
  findCmnts,
  allCmnts,
} = require("../Controllers/Comments");

const router = express.Router();

router
  .get("/", findCmnts)
  .post("/", addCmnts)
  .put("/", updateCmnts)
  .delete("/", deleteCmnts);
router.get("/all", allCmnts);
module.exports = router;
