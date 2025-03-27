const express = require("express")
const { Op } = require("sequelize")

const { User, Post, Comment, Category } = require("../models")
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const searchQuery = req.query.query || "";
        const table = req.query.table || "users"; // Default search in users
        let results = [];

        if (searchQuery) {
            switch (table) {
                case "users":
                    results = await User.findAll({
                        where: {
                            [Op.or]: [
                                { name: { [Op.like]: `%${searchQuery}%` } },
                                { email: { [Op.like]: `%${searchQuery}%` } }
                            ]
                        }
                    });
                    break;

                case "posts":
                    results = await Post.findAll({
                        where: {
                            [Op.or]: [
                                { title: { [Op.like]: `%${searchQuery}%` } },
                                { content: { [Op.like]: `%${searchQuery}%` } }
                            ]
                        }
                    });
                    break;

                case "comments":
                    results = await Comment.findAll({
                        where: {
                            content: { [Op.like]: `%${searchQuery}%` }
                        }
                    });
                    break;

                case "categories":
                    results = await Category.findAll({
                        where: {
                            name: { [Op.like]: `%${searchQuery}%` }
                        }
                    });
                    break;
            }
        }

        res.render("home", { results, searchQuery, table });
    } catch (error) {
        console.error("Error fetching results:", error);
        res.status(500).send("Error retrieving data");
    }
})

module.exports = router