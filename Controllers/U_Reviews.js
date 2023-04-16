const u_review = require("../Model/U_Reviews.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const addU_Review = catchAsyncErrors((req, res, next) => {
  const { id, bookname, review, image, stars } = req.body;

  u_review
    .create({
      id: id,
      bookname: bookname,
      review: review,
      image: image,
      stars: stars,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User Review.",
      });
    });
});

const deleteU_Review = catchAsyncErrors((req, res, next) => {
  const { id } = req.body;

  // console.log(cname, cemail, cpassword, caddress);
  u_review
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User Review was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User Review with id=${id}. Maybe User Review was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User Review with id=" + id,
      });
    });
});

const updateU_Review = catchAsyncErrors((req, res, next) => {
  const { id, bookname, review, image, stars } = req.body;

  // console.log(cname, cemail, cpassword, caddress);
  u_review
    .update(
      {
        id: id,
        bookname: bookname,
        review: review,
        image: image,
        stars: stars,
      },
      { where: { id: id } }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User Review was updated successfully!",
        });
      } else {
        res.send({
          message: `Cannot update User Review with id=${id}. Maybe User Review was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not update User Review with id=" + id,
      });
    });
});

const findU_Review = catchAsyncErrors((req, res, next) => {
  const { id } = req.body;

  // console.log(cname, cemail, cpassword, caddress);
  u_review
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User Review with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User Review with id=" + id,
      });
    });
});

const allU_Review = catchAsyncErrors((req, res, next) => {
  // const { id } = req.body;

  // console.log(cname, cemail, cpassword, caddress);
  u_review
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User Review`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User Review",
      });
    });
});

module.exports = {
  addU_Review,
  updateU_Review,
  deleteU_Review,
  findU_Review,
  allU_Review,
};
