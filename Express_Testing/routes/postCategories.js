const express = require('express');
const { PostCategory, Post, Category } = require('../models');  // Import necessary models
const router = express.Router();

// GET All Post-Category Relationships
router.get('/', async (req, res) => {
  try {
    const postCategories = await PostCategory.findAll({
      include: [
        { model: Post, attributes: ['id', 'title'] },     // Include Post details
        { model: Category, attributes: ['id', 'name'] }    // Include Category details
      ]
    });
    res.render('postCategories/index', { postCategories, title: 'Post-Category Relationships' });
  } catch (error) {
    console.error("Error fetching post-category relationships:", error);
    res.status(500).send("Server Error");
  }
});

// GET Single Post-Category Relationship
router.get('/:id', async (req, res) => {
  try {
    const postCategory = await PostCategory.findByPk(req.params.id, {
      include: [
        { model: Post, attributes: ['id', 'title'] },
        { model: Category, attributes: ['id', 'name'] }
      ]
    });
    if (!postCategory) {
      return res.status(404).send("Post-Category relationship not found");
    }
    res.render('postCategories/show', { postCategory, title: `Post-Category - ${postCategory.id}` });
  } catch (error) {
    console.error("Error fetching post-category relationship:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
