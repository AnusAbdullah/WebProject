const express = require("express");
// const { route } = require("express/lib/application");

const {
  addbook,
  updatebook,
  deletebook,
  findbook,
  viewbooks,
  allbooks,
} = require("../Controllers/Books");

const router = express.Router();

router
  .get("/", findbook)
  .post("/", addbook)
  .put("/", updatebook)
  .delete("/", deletebook);

router.get("/all", allbooks);
// router.route("/viewproducts").get(viewbooks);
router.get("/viewproducts", viewbooks);
module.exports = router;
