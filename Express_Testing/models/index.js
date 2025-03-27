const sequelize = require("../config/database");

const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const { Category, PostCategory } = require("./Category");  // Ensure correct export

// Define Associations
User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

Post.belongsToMany(Category, { through: PostCategory, foreignKey: "postId" });
Category.belongsToMany(Post, { through: PostCategory, foreignKey: "categoryId" });

module.exports = { sequelize, User, Post, Comment, Category, PostCategory };
