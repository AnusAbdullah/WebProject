const books = require("../Model/Books.js");

const addbook = (req, res, next) => {
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

  
};

const deletebook = (req, res, next) => {
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
};

const updatebook = (req, res, next) => {
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
  //   console.log("User created");
  //   res.render("login-signin", { data: "sign-up successfully" });

  // } catch (error) {
  //   // console.log(error);
  // //   res.render("login-signin", { data: "email already exist" });
  // }
};

const findbook = (req, res, next) => {
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
    }); //   console.log("User created");
  //   res.render("login-signin", { data: "sign-up successfully" });

  // } catch (error) {
  //   // console.log(error);
  // //   res.render("login-signin", { data: "email already exist" });
  // }
};

module.exports = {
  addbook,
  updatebook,
  deletebook,
  findbook,
};
