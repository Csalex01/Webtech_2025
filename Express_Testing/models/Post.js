const { DataTypes } = require("sequelize")
const sequelize = require("../database")
const User = require("./User")

const Post = sequelize.define("Post", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Post.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE"
})

User.hasMany(Post, {
    foreignKey: "userId"
})

module.exports = Post