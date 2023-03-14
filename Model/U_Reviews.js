const Sequelize = require("sequelize");
const sequelize = require("../DB/Connection");

const user = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  review: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = user;
