const sequelize = require("./database");
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const { Category } = require("./models/Category");

async function insertData() {
  try {
    await sequelize.sync({ force: true });

    // Create users
    const user1 = await User.create({ name: "Alice", email: "alice@example.com" });
    const user2 = await User.create({ name: "Bob", email: "bob@example.com" });

    // Create posts
    const post1 = await Post.create({ title: "First Post", content: "Hello World!", userId: user1.id });
    const post2 = await Post.create({ title: "Sequelize Basics", content: "How to use Sequelize", userId: user2.id });

    // Create comments
    await Comment.create({ text: "Nice post!", userId: user2.id, postId: post1.id });
    await Comment.create({ text: "Very informative!", userId: user1.id, postId: post2.id });

    // Create categories
    const cat1 = await Category.create({ name: "Technology" });
    const cat2 = await Category.create({ name: "General" });

    await post1.setCategories([cat1, cat2]); 
    await post2.setCategories([cat1]);       

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await sequelize.close();
  }
}

insertData();
