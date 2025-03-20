# Sequelize telepítése

Node csomag telepítése:
```bash
$ npm install --save sequelize
```
Az adatbázis-kezelőhöz szükséges megfelelő driver telepítése:
```bash
$ npm install --save pg pg-hstore   # Postgres
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious        # Microsoft SQL Server
$ npm install --save oracledb       # Oracle Database
```
A laborgyakorlat során használt driver: `SQLite`.

# Példa
```javascript
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
  },
  { sequelize, modelName: 'user' },
);

(async () => {
  await sequelize.sync();
  const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20),
  });
  console.log(jane.toJSON());
})();
```

# database.js

Ez a fájl felelős az adatbázissal való kapcsolat létrehozásáért. Az adatbázis driverének megadására a `dialect` paraméter szolgál, amely itt `sqlite`. Ha a tárolást lokálisan szeretnénk, akkor a `storage` paraméter segítségével megadhatjuk az elérési utat, például `database.sqlite`.

# sync.js

Ez a fájl biztosítja az adatbázis szinkronizálását. A `force` paraméter beállításával meghatározhatjuk, hogy a szinkronizálás előtt minden alkalommal törölje-e a meglévő táblákat. Ha a `force` értéke `true`, akkor törli és újra létrehozza azokat az új modellek alapján, egyébként megtartja a már létező táblákat.

# printObjectMethods.js

Ez a kód arra szolgál, hogy kiírja a különböző modellekhez tartozó metódusokat a Sequelize ORM használatával. A kód minden egyes modellel végrehajt egy lekérdezést, majd kiírja a modellek prototípusában elérhető metódusokat.

# Fontos megjegyzések

Amikor több-a-többhöz kapcsolatot definiálunk egy modellben, a Sequelize automatikusan létrehozza a szükséges `set`, `add`, `remove`, `create`, illetve `count` metódusokat.