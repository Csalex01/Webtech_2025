const sequelize = require("./database");
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const { Category, PostCategory } = require("./models/Category");

const printModelMethods = async (model, modelName) => {
    const instance = await model.findOne();
    
    if (!instance) {
        console.log(`${modelName} has no records in the database.`);
        return;
    }

    console.log(`${modelName} methods:`);
    console.log(Object.keys(instance.__proto__));
};

printModelMethods(Post, "Post");
printModelMethods(User, "User");
printModelMethods(Comment, "Comment");
printModelMethods(Category, "Category");
printModelMethods(PostCategory, "PostCategory");

