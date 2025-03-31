# models/Category.js

Két Sequelize modellt definiál:
- `Category` (kategóriák tárolására)
- `PostCategory` (kapcsolótábla a posztok és kategóriák összekapcsolására)

Sequelize, adattípusok valamint modell importálása:
```javascript
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
```

## Category modell definiálása

A `Category` modell csak egy mezővel rendelkezik: `name`.
```javascript
class Category extends Model { } // sequelize.Model-el való kibővítés

// Category modell inicializálása
Category.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false         // Nem engedélyezünk NULL értékeket
  }
}, {
  sequelize,
  modelName: "category"     // Tábla nevének meghatározása
});
```

## PostCategory modell definiálása

A PostCategory egy ú.n. kapcsolótábla a következő mezőkkel:
- `postId`: Poszt azonosítója
- `categoryId`: Kategóriia azonosítója

```javascript
class PostCategory extends Model { } // sequelize.Model-el való kibővítés

PostCategory.init({
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false          // Nem engedélyezünk NULL értékeket
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false          // Nem engedélyezünk NULL értékeket
  }
}, {
  sequelize,
  modelName: "post_category",
  timestamps: false
});
```