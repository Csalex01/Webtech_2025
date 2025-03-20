const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Post = require("./Post");

const PostCategory = sequelize.define("PostCategory", {}, { timestamps: false })

const Category = sequelize.define("Category", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})


Post.belongsToMany(Category, { through: PostCategory });
Category.belongsToMany(Post, { through: PostCategory });

module.exports = { Category, PostCategory };