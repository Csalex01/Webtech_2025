# routes/posts.js

Ez a fájl egy Express.js router, amely a blogbejegyzések kezelésére szolgál. A Sequelize ORM-et használja az adatbázis-kezeléshez, és az EJS sablonmotort a nézetek rendereléséhez. A bejegyzésekhez kapcsolódnak felhasználók, kategóriák és hozzászólások, így az adatok kapcsolatait is kezeli.

## Használt adatbázis műveletek
- `Post.findAll({ include: [...] })` → Összes bejegyzés lekérdezése, a hozzájuk tartozó kategóriákkal és szerzőkkel
- `Post.findByPk(id, { include: [...] })` → Egy bejegyzés lekérdezése az ID alapján
- `Comment.create({ content, postId, userId })` → Új hozzászólás létrehozása
- `Post.create({ title, content, userId })` → Új bejegyzés létrehozása
- `post.setCategories([])` → Egy bejegyzés kategóriáinak frissítése
- `Post.destroy({ where: { id } })` → Egy bejegyzés törlése
- `Comment.destroy({ where: { postId } })` → Bejegyzéshez tartozó kommentek törlése

## Szükséges modulok importálása
```javascript
const express = require('express');
const { Post, Comment, Category, PostCategory, User } = require('../models');  
const router = express.Router();
```

## GET Kérések

### Összes bejegyzés lekérése
```javascript
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ['name'] },
        { model: Category, attributes: ['id', 'name'] }, // Kategória információk
      ]
    });
    const users = await User.findAll();

    res.render('posts/index', { posts, users, title: 'All Posts' });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Server Error");
  }
});
```

### Egy adott bejegyzés megjelenítése
```javascript
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User },  
        { model: Comment, include: User },  
        { model: Category }
      ]
    });

    if (!post) {
      return res.status(404).send("Post not found.");
    }

    const users = await User.findAll();
    res.render('posts/show', { post, users });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).send("Internal Server Error");
  }
});
```

### Bejegyzés szerkesztése
```javascript
router.get('/:id/edit', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [Category]  
    });
    const categories = await Category.findAll();  
    res.render('posts/edit', { post, categories, title: 'Edit Post' });
  } catch (error) {
    console.error("Error fetching post for editing:", error);
    res.status(500).send("Server Error");
  }
});
```

## POST Kérések

### Új hozzászólás hozzáadása egy bejegyzéshez
```javascript
router.post('/:postId/comments', async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;

  try {
    await Comment.create({
      content,
      postId,
      userId: 1  // Ideális esetben az authentikációból jön a felhasználó azonosítója
    });

    res.redirect(`/posts/${postId}`);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).send("Internal Server Error");
  }
});
```

### Új bejegyzés létrehozása
```javascript
router.post("/create", async (req, res) => {
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    return res.status(400).send("All fields are required");
  }

  try {
    await Post.create({ title, content, userId });
    res.redirect("/posts");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating post");
  }
});
```

### Bejegyzés frissítése
```javascript
router.post("/:id/update", async (req, res) => {
  try {
    const { title, content, categories } = req.body;
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    post.title = title;
    post.content = content;
    await post.save();

    await post.setCategories([]);

    if (categories) {
      await post.addCategories(categories);
    }

    res.redirect(`/posts/${post.id}`);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).send("Server Error");
  }
});
```

### Bejegyzés törlése (kommentekkel és kategória kapcsolatokal együtt)
```javascript
router.post('/:id/delete', async (req, res) => {
  const postId = req.params.id;

  try {
    await Comment.destroy({ where: { postId } });
    await PostCategory.destroy({ where: { postId } });
    await Post.destroy({ where: { id: postId } });

    res.redirect('/posts');
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send("Error deleting post and its dependencies");
  }
});
```