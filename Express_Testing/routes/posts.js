const express = require('express');
// const { Post } = require('../models');  // Import Post model
const { Post, Comment, Category, User } = require('../models');  // Adjust the path based on your setup
const router = express.Router();

// GET all posts with their associated categories
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ['name'] },
        { model: Category, attributes: ['id', 'name'] }, // Include Category details
      ]
    });
    const users = await User.findAll()

    res.render('posts/index', { posts, users, title: 'All Posts' });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Server Error");
  }
});


// GET Single Post
router.get('/:id', async (req, res) => {
  const postId = req.params.id;

  try {
      // Fetch the post by ID along with associated comments, users, and categories
      const post = await Post.findByPk(postId, {
          include: [
              { model: User },
              { model: Comment, include: User }, // Include comments with user info
              { model: Category } // Include associated categories
          ]
      });

      if (!post) {
          return res.status(404).send("Post not found.");
      }

      // Fetch all users to display in the dropdown
      const users = await User.findAll();

      // Render the post show page and pass the post and users data
      res.render('posts/show', { post, users });
  } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).send("Internal Server Error");
  }
});

// Route to handle adding a new comment to a post
router.post('/:postId/comments', async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;

  try {
      // Create a new comment for the post
      const comment = await Comment.create({
          content,
          postId: postId, // Associate the comment with the correct post
          userId: 1 // Here, you would ideally get the userId from the session or authentication (1 is a placeholder)
      });

      // Redirect back to the post's show page
      res.redirect(`/posts/${postId}`);
  } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).send("Internal Server Error");
  }
});

// Create a new post (manually assign a user selected from the dropdown)
router.post("/create", async (req, res) => {
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    return res.status(400).send("All fields are required");
  }

  if (!title.trim() || !content.trim() || !userId) {
    return res.redirect("/posts?error=All fields are required");
  }

  try {
    await Post.create({
      title,
      content,
      userId: userId, // Manually assign selected user
    });

    res.redirect("/posts");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating post");
  }
});

module.exports = router;
