const Sequelize = require("sequelize");
const sequelize = require("../DB/Connection");

const user = sequelize.define("books", {
  isbn: {
    type: Sequelize.INTEGER,
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
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  linktobuy: {
    type: Sequelize.STRING(30),
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

module.exports = user;
