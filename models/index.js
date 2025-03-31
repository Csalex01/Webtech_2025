const sequelize = require("../config/database");

const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const { Category, PostCategory } = require("./Category"); 

User.hasMany(Post, { foreignKey: "userId", onDelete: "CASCADE" });
Post.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

Post.hasMany(Comment, { foreignKey: "postId", onDelete: "CASCADE" });
Comment.belongsTo(Post, { foreignKey: "postId" });

Post.belongsToMany(Category, { through: PostCategory, foreignKey: "postId", onDelete: "CASCADE" });
Category.belongsToMany(Post, { through: PostCategory, foreignKey: "categoryId" });

Comment.belongsTo(Post, { foreignKey: 'postId', onDelete: 'CASCADE' });

PostCategory.belongsTo(Post, { foreignKey: 'postId', onDelete: 'CASCADE' });
PostCategory.belongsTo(Category, { foreignKey: 'categoryId', onDelete: 'CASCADE' });

module.exports = { sequelize, User, Post, Comment, Category, PostCategory };
