const Sequelize = require("sequelize");
const sequelize = require("../DB/Connection");

const posts = sequelize.define("posts", {
    
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    u_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    genre: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: "Not Specified",
    },
    review: {
        type: Sequelize.STRING(1000),
        allowNull: false,
    },
  });
  
  module.exports = posts;