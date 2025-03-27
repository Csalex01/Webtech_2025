const express = require('express');
const { Category } = require('../models');  // Import Category model
const router = express.Router();

// GET All Categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();  // Fetch all categories
        res.render('categories/index', { categories, title: 'Categories' });  // Render categories with EJS
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).send("Server Error");
    }
});

// GET Single Category
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id, { include: 'posts' });  // Fetch category with posts
        if (!category) {
            return res.status(404).send("Category not found");
        }
        res.render('categories/show', { category, title: `Category - ${category.name}` });  // Render category detail
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
