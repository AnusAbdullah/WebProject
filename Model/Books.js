const Sequelize = require("sequelize");
const sequelize = require("../DB/Connection");

const books = sequelize.define("books", {
  isbn: {
    type: Sequelize.STRING(50),
    allowNull: false,
    primaryKey: true,
    isInt: true,
  },
  bookname: {
    type: Sequelize.STRING(40),
    allowNull: false,
    defaultValue: "Not Specified",
  },
  author: {
    type: Sequelize.STRING(40),
    allowNull: false,
  },
  publisher: {
    type: Sequelize.STRING(40),
    allowNull: false,
  },
  linktobuy: {
    type: Sequelize.STRING(100),
    allowNull: false,
    isUrl: true,
  },
  image: {
    type: Sequelize.BLOB("long"),
    allowNull: false,
  },
  bookpdf: {
    type: Sequelize.BLOB("long"),
    allowNull: false,
  },
});

module.exports = books;
