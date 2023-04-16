const books = require("../Model/Books.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");


const addbook = catchAsyncErrors((req, res, next) => {

  const { isbn, bookname, author, publisher, linktobuy, image, bookpdf } =
    req.body;

  // console.log(cname, cemail, cpassword, caddress);
  books
    .create({
      isbn: isbn,
      bookname: bookname,
      author: author,
      publisher: publisher,
      linktobuy: linktobuy,
      image: image,
      bookpdf: bookpdf,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book.",
      });
    });
});

const deletebook = catchAsyncErrors((req, res, next) => {
  const { isbn } = req.body;

  // console.log(cname, cemail, cpassword, caddress);
  books
    .destroy({
      where: { isbn: isbn },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Book was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Book with id=${id}. Maybe Book was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Book with id=" + id,
      });
    });
});

const updatebook = catchAsyncErrors((req, res, next) => {
  const { isbn, bookname, author, publisher, linktobuy, image, bookpdf } =
    req.body;

  // console.log(cname, cemail, cpassword, caddress);
  books
    .update(
      {
        isbn: isbn,
        bookname: bookname,
        author: author,
        publisher: publisher,
        linktobuy: linktobuy,
        image: image,
        bookpdf: bookpdf,
      },
      { where: { isbn: isbn } }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Book was updated successfully!",
        });
      } else {
        res.send({
          message: `Cannot update Book with id=${id}. Maybe Book was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not update Books with id=" + id,
      });
    });
});

const findbook = catchAsyncErrors((req, res, next) => {
  const { isbn } = req.body;

  // console.log(cname, cemail, cpassword, caddress);
  books
    .findByPk(isbn)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Books with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Books with id=" + id,
      });
    }); 
});

const allbooks = catchAsyncErrors((req, res, next) => {
  books
    .findAll()
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Books`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Books",
      });
    });
});

const viewbooks = catchAsyncErrors(async (req, res) => {
  let { page, bookname, author, publisher } = req.query;

  let book = await books.findAll({
    where: {
      bookname: bookname ? { [Op.like]: `%${bookname}%` } : { [Op.ne]: null },
      author: author ? { [Op.like]: `%${author}%` } : { [Op.ne]: null },
      publisher: publisher
        ? { [Op.like]: `%${publisher}%` }
        : { [Op.ne]: null },
    },
    // order: sort ? sortFilter.map((attri) => [attri, sorder]) : null,
    limit: 5,
    offset: (Number(page) - 1) * 5,
  });
  res.status(200).json({ length: book.length, book });
});

module.exports = {
  addbook,
  updatebook,
  deletebook,
  findbook,
  viewbooks,
  allbooks,
};
