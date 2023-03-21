const Sequelize = require("sequelize");
const sequelize = require("../DB/Connection");

const user = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  fname: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
  lname: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
    isEmail: true,
  },
  password: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
});

module.exports = user;
