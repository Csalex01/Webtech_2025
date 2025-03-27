const { Sequelize, DataTypes, Model } = require("sequelize")
const User = require("./User");
const Post = require("./Post");
const sequelize = require("../config/database")

class Comment extends Model { }

Comment.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
  sequelize,
  modelName: "comment"
}
);

Comment.belongsTo(User, { foreignKey: "userId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

module.exports = Comment