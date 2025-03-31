# Adatbázis létrehozása és kapcsolat tesztelése

Az adatbázis létrehozása a `new Sequelize(...)` függvényhívás segítségével történik:

```javascript
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydatabase', 'felhasznalo', 'jelszo', {
  host: 'localhost',
  dialect: 'mysql'
});

```

A kapcsolatot a következőképpen tudjuk tesztelni:

```javascript
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Az adatbázis kapcsolat sikeres!');
  } catch (error) {
    console.error('Nem sikerült csatlakozni az adatbázishoz:', error);
  }
}
```