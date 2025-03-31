# routes/comments.js

Ez a fájl egy Express.js router a hozzászólások kezelésére a webalkalmazásban. A Sequelize ORM-et használja az adatbázis-kezeléshez, és az EJS sablonmotort a nézetek megjelenítéséhez. Ez a router lehetővé teszi a hozzászólások hozzáadását, szerkesztését, törlését és megtekintését. A hozzászólások felhasználókhoz és bejegyzésekhez kapcsolódnak, így egy hozzászólás megtekintésekor a hozzátartozó felhasználó neve és a bejegyzés címe is megjelenik.

## Használt adatbázis műveletek

- `Comment.findAll({ include: [...] })` → Az összes komment lekérdezése a kapcsolódó felhasználóval és bejegyzéssel
- `Comment.findByPk(req.params.id, { include: User })` → Egy adott komment lekérdezése az ID alapján
- `comment.update({ content })` → Egy komment tartalmának frissítése
- `Comment.destroy({ where: { id } })` → Egy komment törlése az adatbázisból

Szükséges modulok importálása:
```javascript
const express = require('express');
const { Comment, User, Post } = require('../models');  // Import Comment model
const router = express.Router();
```

## GET kérések

### Összes komment lekérése
```javascript
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [{
        model: Post,
        attributes: ['id', 'title'], // Csak a bejegyzés ID-ját és címét kérjük le
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
```

### Egy adott komment lekérése
```javascript
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const comment = await Comment.findByPk(id, {
          include: User
      });
      res.render('comments/show', { comment, title: 'Comment Details' });
  } catch (error) {
      console.error("Error retrieving comment:", error);
      res.status(500).send("Error retrieving comment");
  }
});
```

### komment szerkesztésének megjelenítése
```javascript
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  try {
      const comment = await Comment.findByPk(id);
      res.render('comments/edit', { comment, title: 'Edit Comment' });
  } catch (error) {
      console.error("Error retrieving comment for editing:", error);
      res.status(500).send("Error retrieving comment for editing");
  }
});
```

## POST kérések

### Létező komment szerkesztése
```javascript
router.post('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(404).send("Comment not found");
      }
      await comment.update({ content });
      res.redirect(`/comments/${id}`);
  } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).send("Error updating comment");
  }
});
```

### Létező komment törlése
```javascript
router.post('/:id/delete', async (req, res) => {
  const { id } = req.params;
  try {
      await Comment.destroy({ where: { id } });
      res.redirect('/comments');  // Visszairányítás a hozzászólások listájához
  } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).send("Error deleting comment");
  }
});
```