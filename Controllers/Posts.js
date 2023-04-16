const Posts = require("../Model/Posts.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const addPosts = catchAsyncErrors((req, res, next) => {
  const { id, u_name, genre, review } = req.body;

  Posts.create({
    id: id,
    u_name: u_name,
    genre: genre,
    review: review,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating new Post.",
      });
    });
});

const updatePosts = catchAsyncErrors((req, res, next) => {
  const { id, u_name, genre, review } = req.body;

  Posts.update(
    {
      id: id,
      u_name: u_name,
      genre: genre,
      review: review,
    },
    { where: { id: id } }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Posts was updated successfully!",
        });
      } else {
        res.send({
          message: `Cannot update Posts with id=${id}. Posts was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not update Posts with id=" + id,
      });
    });
});

const deletePosts = catchAsyncErrors((req, res, next) => {
  const { id } = req.body;

  Posts.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Posts was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Posts with id=${id}. Posts was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Posts with id=" + id,
      });
    });
});

const findPosts = catchAsyncErrors((req, res, next) => {
  const { id } = req.body;
  Posts.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Posts with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Posts with id=" + id,
      });
    });
});

const allPosts = catchAsyncErrors((req, res, next) => {
  // const { id } = req.body;
  Posts.findAll()
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Posts`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Posts",
      });
    });
});

module.exports = {
  addPosts,
  updatePosts,
  deletePosts,
  findPosts,
  allPosts
};
