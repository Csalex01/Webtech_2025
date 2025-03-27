const express = require("express");
const router = express.Router();
const { User } = require("../models");

// Get all users and render template
router.get("/", async (req, res) => {
    try {
        const users = await User.findAll();
        res.render("users/index", { users }); // Renders views/users/index.ejs
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching users");
    }
});

// Get a single user by ID and render template
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.render("users/show", { user }); // Renders views/users/show.ejs
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching user");
    }
});

module.exports = router;
