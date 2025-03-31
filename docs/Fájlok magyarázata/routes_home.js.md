# routes/home.js

Ez a fájl egy Express.js router, amely lehetővé teszi a felhasználók, bejegyzések, hozzászólások és kategóriák keresését a webalkalmazásban. A Sequelize ORM-et használja az adatbázis-lekérdezésekhez, és az EJS sablonmotort a nézetek megjelenítéséhez. A keresés az SQL LIKE művelettel történik, amely lehetővé teszi a részleges egyezéseket is.

## Használt adatbázis műveletek
- `User.findAll({ where: { [Op.or]: [...] } })` → Felhasználók keresése név vagy email alapján
- `Post.findAll({ where: { [Op.or]: [...] } })` → Bejegyzések keresése cím vagy tartalom alapján
- `Comment.findAll({ where: { content: { [Op.like]: %keresett_szó% } } })` → Hozzászólások keresése tartalom alapján
- `Category.findAll({ where: { name: { [Op.like]: %keresett_szó% } } })` → Kategóriák keresése név alapján

## Szükséges modulok importálása
```javascript
const express = require("express");
const { Op } = require("sequelize");

const { User, Post, Comment, Category } = require("../models");
const router = express.Router();
```

## GET Kérés - Keresés az adatbázisban
```javascript
router.get("/", async (req, res) => {
  try {
    const searchQuery = req.query.query || "";
    const table = req.query.table || "users"; // Alapértelmezett keresés: felhasználók
    let results = [];

    if (searchQuery) {
      switch (table) {
        case "users":
          results = await User.findAll({
            where: {
              [Op.or]: [
                { name: { [Op.like]: `%${searchQuery}%` } },
                { email: { [Op.like]: `%${searchQuery}%` } }
              ]
            }
          });
          break;

        case "posts":
          results = await Post.findAll({
            where: {
              [Op.or]: [
                { title: { [Op.like]: `%${searchQuery}%` } },
                { content: { [Op.like]: `%${searchQuery}%` } }
              ]
            }
          });
          break;

        case "comments":
          results = await Comment.findAll({
            where: {
              content: { [Op.like]: `%${searchQuery}%` }
            }
          });
          break;

        case "categories":
          results = await Category.findAll({
            where: {
              name: { [Op.like]: `%${searchQuery}%` }
            }
          });
          break;
      }
    }

    res.render("home", { results, searchQuery, table });
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).send("Error retrieving data");
  }
});
```