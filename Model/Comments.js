const Sequelize = require("sequelize");
const sequelize = require("../DB/Connection");

const cmnts = sequelize.define("comments", {
    
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  comment: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  u_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    foriegnKey: true,
  },

});

module.exports = cmnts;