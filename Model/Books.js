const Sequelize = require("sequelize");
const sequelize = require("../DB/Connection");

const user = sequelize.define("user", {
  isbn: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  bookname: {
    type: Sequelize.STRING(40),
    allowNull: false,
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
  },
  image: {
    type: Sequelize.BLOB('long'),
    allowNull: false,
  },
  bookpdf: {
    type: Sequelize.BLOB('long'),
    allowNull: false,
  },
});

module.exports = user;
