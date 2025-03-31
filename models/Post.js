const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Post extends Model { }

Post.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "post"
});

module.exports = Post;
