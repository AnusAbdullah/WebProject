const express = require("express");
// const { route } = require("express/lib/application");

const {
  addPosts,
  updatePosts,
  deletePosts,
  findPosts,
  allPosts,
} = require("../Controllers/Posts");

const router = express.Router();

router
  .get("/", findPosts)
  .post("/", addPosts)
  .put("/", updatePosts)
  .delete("/", deletePosts);
router.get("/all", allPosts);
module.exports = router;
