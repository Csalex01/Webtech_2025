# models/User.js

A User (felhasználó) modellt definiálja a Sequelize ORM-ben, amely az adatbázisban a felhasználók adatait tárolja.

Szükséges modulok importálása:
```javascript
const { Sequelize, DataTypes, Model } = require("sequelize")
const sequelize = require("../config/database")
```

A `User` modul a következő mezőkkel rendelkezik:
- `id`: A felhasználó azonosítója
- `name`: A felhasználó neve
- `email`: A felhasználó e-mail címe

```javascript
class User extends Model { } // sequelize.Model-el való kibővítés

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,    // Automatikus inkrementálás
      primaryKey: true        // Elsődleges kulcs meghatározása
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false        // Nem engedélyezünk NULL értékeket
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,       // Nem engedélyezünk NULL értékeket
      unique: true            // Egyedi mező
    }
  }, {
  sequelize,
  modelName: "user"
}
)
```