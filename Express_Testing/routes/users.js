const express = require("express");
const router = express.Router();
const { User, Comment, Post } = require("../models");

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

router.post('/create', async (req, res) => {
  const { name, username, email } = req.body;

  try {
      // Create the new user
      await User.create({
          name,
          username,
          email
      });

      res.redirect('/users');  // Redirect to the users list page
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Error creating user');
  }
});


// Delete user and cascade delete their posts and comments
router.post("/:id/delete", async (req, res) => {
  try {
      const userId = req.params.id;

      // Fetch all post IDs belonging to the user
      const posts = await Post.findAll({
          attributes: ["id"],
          where: { userId }
      });

      const postIds = posts.map(post => post.id); // Extract IDs from post objects

      // Delete comments associated with the user's posts
      await Comment.destroy({ where: { postId: postIds } });

      // Delete user's posts
      await Post.destroy({ where: { userId } });

      // Delete user's comments
      await Comment.destroy({ where: { userId } });

      // Delete the user
      await User.destroy({ where: { id: userId } });

      res.redirect("/users");
  } catch (error) {
      console.error("❌ Error deleting user:", error);
      res.redirect("/users");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
          return res.redirect("/users");
      }
      res.render("users/edit", { user });
  } catch (error) {
      console.error("Error fetching user:", error);
      res.redirect("/users");
  }
});

router.post("/:id/update", async (req, res) => {
  try {
      const { name, email } = req.body;
      await User.update({ name, email }, { where: { id: req.params.id } });

      res.redirect("/users");
  } catch (error) {
      console.error("Error updating user:", error);
      res.redirect("/users");
  }
});



module.exports = router;
