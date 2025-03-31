# Modellek felépítése

Egy modellt kétféle képpen tudunk létrehozni:
1. A `sequelize.define()` függvényhívás segítségével;
2. A létrehozott osztály örökli a `Model` osztályt.

Példa: Hozzunk létre egy User modellt a következő struktúrával:
- `id`: A felhasználó azonosítója (elsődleges kulcs);
- `username`: A felhasználó felhasználóneve;
- `email`: A felhasználó e-mail címe;
- `paassword`: A felhasználó jelszava (ajánlott titkosító algoritmust alkalmazni - hash);
- `isAdmin`: A felhasználó adminisztrátor vagy sem.

## Megvalósítás `sequelize.define()` függvényhívás segítségével

```javascript
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:'); // SQLite adatbázis (vagy más SQL driver)

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true // Beépített ellenőrzés
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'users', // Opcionális: egyedi tábla név beállítása
  timestamps: true // createdAt és updatedAt automatikusan létrejön
});

```

## Megvalósítás a `Model` öröklésének segítségével

```javascript
class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize, // Kapcsolódás az adatbázishoz
  modelName: 'User', // Model neve
  tableName: 'users', // Egyedi táblanév (ha szükséges)
  timestamps: true
});

```

# Adatbázis szinkronizálása

Mielőtt használni tudnánk a felépített modelleket fontos, hogy szinkronizáljuk az adatbázist vele. Ez a következőképpen történik:

```javascript

const sync = async () => {
  await sequelize.sync({ force: true }) // Az összes modell létrehozása és létező táblák törlése
  console.log("Az adatbázis szinkronizálva!")
}
```