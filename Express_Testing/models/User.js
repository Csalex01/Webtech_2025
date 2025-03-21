const { Sequelize, DataTypes, Model } = require("sequelize")
const sequelize = require("../database")

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }
)

module.exports = User