const express = require('express');
const { Comment, User, Post } = require('../models');  // Import Comment model
const router = express.Router();

// Fetch all comments along with the associated user data
router.get('/', async (req, res) => {
  try {
    // Fetch all comments along with their associated post titles
    const comments = await Comment.findAll({
      include: [{
        model: Post,
        attributes: ['id', 'title'], // Include only the post id and title
      }, {
        model: User
      }],
    });

    res.render('comments/index', { comments, title: 'Comments' });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).send("Server Error");
  }
});

// GET Single Comment
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const comment = await Comment.findByPk(id, {
          include: User
      });
      res.render('comments/show', { comment });
  } catch (error) {
      console.error("Error retrieving comment:", error);
      res.status(500).send("Error retrieving comment");
  }
});

router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  try {
      const comment = await Comment.findByPk(id);
      res.render('comments/edit', { comment });
  } catch (error) {
      console.error("Error retrieving comment for editing:", error);
      res.status(500).send("Error retrieving comment for editing");
  }
});

router.post('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
      const comment = await Comment.findByPk(id);
      await comment.update({ content });
      res.redirect(`/comments/${id}`);
  } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).send("Error updating comment");
  }
});

router.post('/:id/delete', async (req, res) => {
  const { id } = req.params;
  try {
      await Comment.destroy({ where: { id } });
      res.redirect('/comments');  // Redirect to the comments index page
  } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).send("Error deleting comment");
  }
});

module.exports = router;
