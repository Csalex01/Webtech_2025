const express = require('express');
const { Category, Post } = require('../models');  // Import Category model
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

// Show the form to create a new category
router.get('/create', (req, res) => {
  res.render('categories/create', { title: 'Create Category' });
});

// Handle the form submission to create a new category
router.post('/create', async (req, res) => {
  try {
    const { name } = req.body;
    await Category.create({ name });
    res.redirect('/categories');
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).send("Server Error");
  }
});

// Show the form to edit a category
router.get('/:id/edit', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).send('Category not found');
    }
    res.render('categories/edit', { category, title: 'Edit Category' });
  } catch (error) {
    console.error("Error fetching category for edit:", error);
    res.status(500).send("Server Error");
  }
});

// Handle the form submission to update a category
router.post('/:id/update', async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).send('Category not found');
    }
    category.name = name;
    await category.save();
    res.redirect('/categories');
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).send("Server Error");
  }
});

router.post('/:id/delete', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).send('Category not found');
    }
    await category.destroy();
    res.redirect('/categories');
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).send("Server Error");
  }
});


// GET Single Category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: {
        model: Post,  // Include posts associated with the category
        through: { attributes: [] }  // Exclude the join table's attributes
      }
    });

    if (!category) {
      return res.status(404).send('Category not found');
    }

    res.render('categories/show', { category, title: 'Category Details' });
  } catch (error) {
    console.error("Error fetching category details:", error);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
