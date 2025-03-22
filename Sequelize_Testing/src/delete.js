const sequelize = require("./database")
const User = require("./models/User")

const deleteUserByEmail = async (email) => {
    try {
        const deletedCount = await User.destroy({
            where: { email : email }
        })

        if(deletedCount > 0) {
            console.log(`Successfully deleted user with email ${email}.`)
        } else {
            console.log(`Could not find user with email ${email}.`)
        }
    }

    catch(error) {
        console.error(`Error while deleting user: ${error}`)
    }
}

deleteUserByEmail("alice@example.com")