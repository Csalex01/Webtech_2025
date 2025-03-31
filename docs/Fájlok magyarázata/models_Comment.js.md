# models/Comment.js

Ez a modell lehetővé teszi, hogy a felhasználók hozzászólásokat írjanak a bejegyzésekhez.

Szükséges modulok importálása:
```javascript
const { Sequelize, DataTypes, Model } = require("sequelize")
const User = require("./User");
const Post = require("./Post");
const sequelize = require("../config/database")
```

A `Comment` modell a következő mezőkkel rendelkezik:
- `content`: A hozzászólás szövege
- `userId`: A felhasználó azonosítója
- `postId`: A poszt azonosítója

```javascript
class Comment extends Model { } // sequelize.Model-el való kibővítés

// Comment modell inicializálása
Comment.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false          // Nem engedélyezünk NULL értékeket
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false        // Nem engedélyezünk NULL értékeket
    },  

    postId: {
      type: DataTypes.INTEGER,
      allowNull: false        // Nem engedélyezünk NULL értékeket
    }
  }, {
  sequelize,
  modelName: "comment"
}
);
```