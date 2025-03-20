const { DataTypes } = require("sequelize")
const sequelize = require("../database")
const User = require("./User")
const Post = require("./Post")

const Comment = sequelize.define("Comment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Comment.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE"
})

Comment.belongsTo(Post, {
    foreignKey: "postId",
    onDelete: "CASCADE"
})

User.hasMany(Comment, {
    foreignKey: "userId"
})

Post.hasMany(Comment, {
    foreignKey: "postId"
})

module.exports = Comment