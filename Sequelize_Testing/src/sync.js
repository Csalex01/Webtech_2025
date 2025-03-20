const sequelize = require("./database");
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const Category = require("./models/Category");

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true })
        console.log("Database synced successfully!")
    }
    
    catch(error) {
        console.log(`Error syncing database: ${error}`)
    }

    finally {
        await sequelize.close()
    }
}

syncDatabase()