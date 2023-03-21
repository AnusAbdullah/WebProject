const Sequelize = require("sequelize");
const sequelize = require("../DB/Connection");

const user = sequelize.define("user_review", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  bookname: {
    type: Sequelize.STRING(40),
    allowNull: false,
    defaultValue: "Not Specified",
  },
  review: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
  image: {
    type: Sequelize.BLOB("long"),
    allowNull: false,
  },
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = user;
