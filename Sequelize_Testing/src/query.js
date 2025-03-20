const sequelize = require("./database");
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const { Category } = require("./models/Category");

const fetchUsers = async () => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: Post,
                    required: false,
                    include: 
                        {
                            model: Comment
                        }
                }
            ]
        })

        console.log(JSON.stringify(users, null, 2))
    }

    catch(error) {
        console.error(`Error fetching users: ${error}`)
    }

    finally {
        await sequelize.close()
    }
}

fetchUsers()