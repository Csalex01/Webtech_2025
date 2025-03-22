const { Sequelize } = require("sequelize")

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "../database/db.sqlite",
    logging: false
})

const testConnection = async () => {
    try {

        await sequelize.authenticate()
        console.log("Connected to database successfully.")

    }

    catch(error) {
        console.error(`Error while connecting to database: ${error}`)
    }
}

testConnection()

module.exports = sequelize