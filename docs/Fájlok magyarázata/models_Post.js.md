# models/Post.js

A Post (bejegyzés) modellt definiálja a Sequelize ORM-ben, és beállítja a kapcsolatát a Category (kategória) modellel egy many-to-many (több-a-többhöz) kapcsolaton keresztül.

Szükséges modulok importálása:
```javascript
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
```

A `Post` modell a következő mezőkkel rendelkezik:
- `title`: A poszt címe
- `content`: A poszt tartalma
- `userId`: A felhasználó azonosítója (aki létrehozta a posztot)

```javascript
class Post extends Model { } // sequelize.Model-el való kibővítés

Post.init({
  title: {
    type: DataTypes.STRING, 
    allowNull: false        // Nem engedélyezünk NULL értékeket
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false        // Nem engedélyezünk NULL értékeket
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false        // Nem engedélyezünk NULL értékeket
  }
}, {
  sequelize,
  modelName: "post"
});
```