const express = require('express');
const { Comment } = require('../models');  // Import Comment model
const router = express.Router();

// GET All Comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll();  // Fetch all comments
    res.render('comments/index', { comments, title: 'Comments' });  // Render comments with EJS
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).send("Server Error");
  }
});

// GET Single Comment
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).send("Comment not found");
    }
    res.render("comments/show", { comment });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
