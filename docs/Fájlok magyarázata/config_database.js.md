# config/database.js

Ez a fájl egy SQLite adatbázishoz csatlakozik a Sequelize ORM segítségével, ellenőrzi a kapcsolatot, és exportálja az adatbázis objektumot más fájlok számára.

Sequelize könyvtár betöltése:
```javascript
const { Sequelize } = require("sequelize")
```

Sequelize adatbázis példány létrehozása SQLite driverrel:
```javascript
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/database.sqlite",
  logging: false
})
```

Teszt függvény:
```javascript
const testConnection = async () => {
  try {

    await sequelize.authenticate()
    console.log("✅> Connected to database successfully.")

  }

  catch (error) {
    console.error(`❌> Error while connecting to database: ${error}`)
  }
}
```

Elvárt kimenet: `✅> Connected to database successfully.` vagy `❌> Error while connecting to database: <HIBAÜZENET>`