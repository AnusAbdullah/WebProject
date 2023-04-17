const Sequelize = require("sequelize");
const sequelize = require("../DB/Connection");

const admin = sequelize.define("admin", {
    
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
    isEmail: true,
  },
  password: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
});

module.exports = admin;
