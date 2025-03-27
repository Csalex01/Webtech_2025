const express = require('express');
// const { Post } = require('../models');  // Import Post model
const { Post, Comment, Category, User } = require('../models');  // Adjust the path based on your setup
const router = express.Router();

// GET all posts with their associated categories
router.get('/', async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [
          { model: Category, attributes: ['id', 'name'] }, // Include Category details
        ]
      });
  
      res.render('posts/index', { posts, title: 'All Posts' });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).send("Server Error");
    }
  });
  

// GET Single Post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, { include: 'comments' });  // Fetch post with comments
        if (!post) {
            return res.status(404).send("Post not found");
        }
        res.render('posts/show', { post, title: `Post - ${post.title}` });  // Render single post
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).send("Server Error");
    }
});


module.exports = router;
