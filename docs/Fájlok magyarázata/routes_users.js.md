# routes/users.js

Ez a fájl egy Express.js router, amely a felhasználók kezelésére szolgál. A Sequelize ORM-et használja az adatbázis-kezeléshez és az EJS sablonmotort a nézetek rendereléséhez. A felhasználókhoz kapcsolódhatnak bejegyzések (Post) és hozzászólások (Comment), így az adatok törlésénél a kapcsolódó rekordokat is kezeli.

## Használt adatbázis műveletek
- `User.findAll()` → Összes felhasználó lekérdezése
- `User.findByPk(id)` → Egy adott felhasználó lekérdezése az ID alapján
- `User.create({ name, email })` → Új felhasználó létrehozása
- `User.update({ name, email }, { where: { id } })` → Felhasználó adatainak frissítése
- `User.destroy({ where: { id } })` → Felhasználó törlése
- `Post.findAll({ where: { userId } })` → Felhasználóhoz tartozó bejegyzések lekérdezése
- `Post.destroy({ where: { userId } })` → Felhasználó bejegyzéseinek törlése
- `Comment.destroy({ where: { userId } })` → Felhasználó hozzászólásainak törlése
- `Comment.destroy({ where: { postId: postIds } })` → Felhasználó bejegyzéseihez tartozó hozzászólások törlése

## Szükséges modulok importálása
```javascript
const express = require("express");
const router = express.Router();
const { User, Comment, Post } = require("../models");
```

## GET Kérések

### Összes felhasználó lekérése
```javascript
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.render("users/index", { users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users");
  }
});
```

### Egy adott felhasználó adatainak lekérése
```javascript
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("users/show", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user");
  }
});
```

### Felhasználó szerkesztési nézet megnyitása
```javascript
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
```

## POST Kérések

### Új felhasználó létrehozása
```javascript
router.post('/create', async (req, res) => {
  const { name, email } = req.body;
  try {
    await User.create({ name, email });
    res.redirect('/users');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
});
```

### Felhasználó adatainak frissítése
```javascript
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
```

### Felhasználó törlése (hozzá tartozó posztokkal és kommentekkel együtt)
```javascript
router.post("/:id/delete", async (req, res) => {
  try {
    const userId = req.params.id;

    // A felhasználóhoz tartozó posztok lekérdezése
    const posts = await Post.findAll({ attributes: ["id"], where: { userId } });
    const postIds = posts.map(post => post.id);

    // Felhasználóhoz tartozó posztokhoz kapcsolódó kommentek törlése
    await Comment.destroy({ where: { postId: postIds } });

    // Felhasználó posztjainak törlése
    await Post.destroy({ where: { userId } });

    // Felhasználó saját kommentjeinek törlése
    await Comment.destroy({ where: { userId } });

    // Felhasználó törlése
    await User.destroy({ where: { id: userId } });

    res.redirect("/users");
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    res.redirect("/users");
  }
});
```