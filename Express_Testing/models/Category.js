const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Category extends Model { }

Category.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "category"
});

class PostCategory extends Model { }

PostCategory.init({
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "post_category",
  timestamps: false
});

module.exports = { Category, PostCategory };
