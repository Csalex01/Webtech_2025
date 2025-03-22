const sequelize = require("./database")
const User = require("./models/User")
const Post = require("./models/Post")
const Comment = require("./models/Comment")
const { Category } = require("./models/Category")

const fetchAllUsers = async () => {
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

        console.log("All users\n----------")

        console.log(JSON.stringify(users, null, 2))
    }

    catch(error) {
        console.error(`Error fetching users: ${error}`)
    }

}

const fetchUser = async (email) => {
    try {
        const user = await User.findOne({
            where: { email: email }
        })

        console.log("One user\n----------")

        if(user) {
            console.log(`User found.`)
            console.log(user.toJSON())
        } else {
            console.log(`Could not find user with email ${email}.`)
        }
    }

    catch(error) {
        console.error(`Error while fetching user: ${error}`)
    }

}

fetchAllUsers()
fetchUser("alice@example.com")
