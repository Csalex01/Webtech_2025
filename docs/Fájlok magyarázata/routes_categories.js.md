# routes/categories.js

Ez a fájl egy Express.js router a kategóriák kezelésére a webalkalmazásban. A Sequelize ORM-et használja az adatbázis-kezeléshez, és az EJS sablonmotort a nézetek rendereléséhez. Ez az Express router lehetővé teszi a kategóriák hozzáadását, szerkesztését, törlését és megtekintését. A kategóriákhoz hozzá vannak kapcsolva a blogbejegyzések, így egy kategória megtekintésekor az összes hozzá tartozó bejegyzés is megjelenik.

Szükséges modulok importálása:
```javascript
const express = require('express');
const { Category, Post } = require('../models');  // Import Category model
const router = express.Router();
```

## Használt adatbázis műveletek

- `Category.findAll()` → Az összes kategória lekérdezése
- `Category.create({ name })` → Új kategória létrehozása
- `Category.findByPk(req.params.id)` → Egy kategória lekérdezése az ID alapján
- `category.save()` → Kategória módosításainak mentése
- `category.destroy()` → Kategória törlése
- `Category.findByPk(req.params.id, { include: { model: Post } })` → Egy kategória és az összes hozzátartozó bejegyzés lekérdezése

## GET kérések

### Összes kategória lekérése
```javascript
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render('categories/index', { categories, title: 'Categories' });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Server Error");
  }
});
```

### Egy karetógira lekérdezése
```javascript
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: {
        model: Post,  // Include posts associated with the category
        through: { attributes: [] }  // Exclude the join table's attributes
      }
    });

    if (!category) {
      return res.status(404).send('Category not found');
    }

    res.render('categories/show', { category, title: 'Category Details' });
  } catch (error) {
    console.error("Error fetching category details:", error);
    res.status(500).send("Server Error");
  }
});
```

### Új kategória létrehozása
```javascript
router.get('/create', (req, res) => {
  res.render('categories/create', { title: 'Create Category' });
});
```

### Létező kategória szerkesztése
```javascript
router.get('/:id/edit', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).send('Category not found');
    }
    res.render('categories/edit', { category, title: 'Edit Category' });
  } catch (error) {
    console.error("Error fetching category for edit:", error);
    res.status(500).send("Server Error");
  }
});
```

## POST kérések

### Új kategória létrehozása (űrlap elküldésének kezelése)
```javascript
router.post('/create', async (req, res) => {
  try {
    const { name } = req.body;
    await Category.create({ name });
    res.redirect('/categories');
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).send("Server Error");
  }
});
```

### Létező kategória szerkesztése (űrlap elküldésének kezelése)
```javascript
router.post('/:id/update', async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).send('Category not found');
    }
    category.name = name;
    await category.save();
    res.redirect('/categories');
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).send("Server Error");
  }
});
```

### Létező kategória törlése
```javascript
router.post('/:id/delete', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).send('Category not found');
    }
    await category.destroy();
    res.redirect('/categories');
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).send("Server Error");
  }
});
```