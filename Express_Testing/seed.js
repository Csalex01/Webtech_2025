const { sequelize, User, Post, Comment, Category, PostCategory } = require("./models");
const { faker } = require("@faker-js/faker");

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("✅> Database synchronized.");

        // Creating Users
        const users = [];
        for (let i = 0; i < 20; i++) {
            users.push(await User.create({
                name: faker.person.fullName(),
                username: faker.internet.username(),
                email: faker.internet.email()
            }));
        }
        console.log("✅> 20 users created!");

        // Creating Categories
        const categories = [];
        for (let i = 0; i < 5; i++) {
            categories.push(await Category.create({
                name: faker.commerce.department(),
            }));
        }
        console.log("✅> 5 categories created!");

        // Creating Posts
        const posts = [];
        for (let i = 0; i < 20; i++) {
            posts.push(await Post.create({
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraphs(2),
                userId: users[Math.floor(Math.random() * users.length)].id,
            }));
        }
        console.log("✅> 20 posts created!");

        // Creating Comments
        for (let i = 0; i < 20; i++) {
            await Comment.create({
                content: faker.lorem.sentence(),
                userId: users[Math.floor(Math.random() * users.length)].id,
                postId: posts[Math.floor(Math.random() * posts.length)].id,
            });
        }
        console.log("✅> 20 comments created!");

        // Creating Post-Category Relationships
        for (const post of posts) {
            const randomCategories = categories.sort(() => 0.5 - Math.random()).slice(0, 2);
            for (const category of randomCategories) {
                await PostCategory.create({
                    postId: post.id,
                    categoryId: category.id,
                });
            }
        }
        console.log("✅> Post-category relationships created!");

        console.log("✅> All records successfully created!");
    } catch (error) {
        console.error("❌> Error inserting data:", error);
    } finally {
        await sequelize.close();
    }
};

seedDatabase()