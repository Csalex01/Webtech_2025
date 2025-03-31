# Sequelize integrálása Express webapplikációval

## Mi az a Sequelize?

A Sequelize egy Node.js ORM (Object-Relational Mapping) eszköz, amelyet SQL alapú adatbázisok kezelésére használnak. Segítségével egyszerűbbé válik az adatbázisokkal való munka, mivel JavaScript objektumok formájában kezelhetjük az adatokat SQL lekérdezések helyett.

### Főbb jellemzői

- Támogatja a legnépszerűbb SQL adatbázisokat: MySQL, PostgreSQL, SQLite, MariaDB, MSSQL
- Modellezés és séma kezelés: Adatbázis táblák definiálása JavaScript/TypeScript objektumokként
- Migrációk támogatása: Könnyen kezelhető adatbázis-verziózás
- Kapcsolatok (asszociációk) kezelése: Egy-az-egyhez, egy-a-többhöz, több-a-többhöz
- Tranzakciók kezelése
- Query Builder: Lehetővé teszi az SQL lekérdezések generálását

## Sequelize telepítése

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

## Alapvető adattípusok

A Sequelize különböző adatbázis-adattípusokat támogat a DataTypes objektumon keresztül.

### Számok (numerikus típusok)

| Típus                 | Leírás                              |
| --------------------- | ----------------------------------- |
| `DataTypes.INTEGER`   | Egész szám (32-bites)               |
| `DataTypes.BIGINT`    | Nagyobb egész szám (64-bites)       |
| `DataTypes.FLOAT`     | Lebegőpontos szám                   |
| `DataTypes.DOUBLE`    | Dupla pontosságú lebegőpontos szám  |
| `DataTypes.DECIMAL`   | Pontos tizedesérték                 |

### Szöveg (string típusok)

| Típus                   | Leírás                                              |
| ----------------------- | --------------------------------------------------- |
| `DataTypes.STRING`      | Változó hosszúságú karakterlánc (max. 255 karakter) |
| `DataTypes.STRING(500)` | Változó hosszúságú karakterlánc (max. 500 karakter) |
| `DataTypes.TEXT`        | Hosszú szöveg (több ezer karakter)                  |
| `DataTypes.CHAR(10)`    | Fix hosszúságú szöveg (pl. kódokhoz)                |

### Dátum és idő (Date/Time típusok)

| Típus                 | Leírás                          |
| --------------------- | ------------------------------- |
| `DataTypes.DATE`      |	Dátum és idő                    |
| `DataTypes.DATEONLY`  |	Csak dátum (év, hónap, nap)     |
| `DataTypes.TIME`      |	Csak idő (óra, perc, másodperc) |

### Logikai érték (boolean típus)

| Típus               | Leírás                                    |
| ------------------- | ----------------------------------------- |
| `DataTypes.BOOLEAN` | Igaz (`true`) vagy hamis (`false`) érték  |

### Egyéb típusok

| Típus                                         | Leírás                                        |
| --------------------------------------------- | --------------------------------------------- |
| `DataTypes.UUID`                              |	Egyedi azonosító                              |
| `DataTypes.JSON`                              |	JSON adatok tárolása                          |
| `DataTypes.ENUM('small', 'medium', 'large')`  |	Korlátozott értékkészlettel rendelkező szöveg |
| `DataTypes.ARRAY(DataTypes.STRING)`           | Tömb (pl. PostgreSQL esetén)                  |
| `DataTypes.BLOB`                              | Bináris adat (pl. fájlok, képek tárolására)   |

## Adatbázis létrehozása és kapcsolat tesztelése

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
    console.log('✅ Az adatbázis kapcsolat sikeres!');
  } catch (error) {
    console.error('❌ Nem sikerült csatlakozni az adatbázishoz:', error);
  }
}
```

## Modellek felépítése

Egy modellt kétféle képpen tudunk létrehozni:
1. A `sequelize.define()` függvényhívás segítségével;
2. A létrehozott osztály örökli a `Model` osztályt.

Példa: Hozzunk létre egy User modellt a következő struktúrával:
- `id`: A felhasználó azonosítója (elsődleges kulcs);
- `username`: A felhasználó felhasználóneve;
- `email`: A felhasználó e-mail címe;
- `paassword`: A felhasználó jelszava (ajánlott titkosító algoritmust alkalmazni - hash);
- `isAdmin`: A felhasználó adminisztrátor vagy sem.

### Megvalósítás `sequelize.define()` függvényhívás segítségével

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

### Megvalósítás a `Model` öröklésének segítségével

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

## Adatbázis szinkronizálása

Mielőtt használni tudnánk a felépített modelleket fontos, hogy szinkronizáljuk az adatbázist vele. Ez a következőképpen történik:

```javascript

const sync = async () => {
  await sequelize.sync({ force: true }) // Az összes modell létrehozása és létező táblák törlése
  console.log("Az adatbázis szinkronizálva!")
}

```

## Alapvető műveletek

Fontos, hogy a műveletek egy aszinkron kontextusban kerüljenek meghívásra (async függvény).

### CREATE - Adatok beszúrása

Új rekord hozzáadása az adatbázishoz. 

Egyszerű beszúrás:
```javascript
const user = await User.create({
  username: 'johndoe',
  email: 'john@example.com'
});
```

Összetett beszúrás (`build` + `save`):
```javascript
const user = User.build({ username: 'janedoe', email: 'jane@example.com' });
await user.save();
```

### READ - Adatok lekérdezése

Rekordok lekérdezése különböző feltételekkel.

Összes adat lekérdezése:
```javascript
const users = await User.findAll();
```

Egyetlen rekord lekérése (`where` feltétellel):
```javascript
const user = await User.findOne({ where: { username: 'johndoe' } });
```

Elsődleges kulcs (ID) alapján keresés:
```javascript
const user = await User.findByPk(1);
```

Kiválasztott oszlopok lekérése:
```javascript
const user = await User.findOne({
  where: { username: 'johndoe' },
  attributes: ['username', 'email'] // Csak ezeket az oszlopokat kérjük
});
```

Szűrés és rendezés:
```javascript
const users = await User.findAll({
  where: { email: { [Op.like]: '%@example.com' } }, // SQL LIKE operátor
  order: [['createdAt', 'DESC']], // Legújabb elöl
  limit: 5 // Csak 5 rekord
});
```

### UPDATE - Adatok módosítása

Meglévő rekordok frissítése.

Egy rekord frissítése:
```javascript
await User.update(
  { email: 'newemail@example.com' },
  { where: { username: 'johndoe' } }
);
```

Rekord objektum módosítása és mentése:
```javascript
const user = await User.findOne({ where: { username: 'johndoe' } });
if (user) {
  user.email = 'updated@example.com';
  await user.save();
}
```

### DELETE - Adatok törlése

Rekordok eltávolítása az adatbázisból.

Egy rekord törlése (`destroy`):
```javascript
await User.destroy({ where: { username: 'johndoe' } });
```

Több rekord törlése:
```javascript
await User.destroy({ where: { email: { [Op.like]: '%@oldmail.com' } } });
```

Elsődleges kulcs alapján való törlés:
```javascript
const user = await User.findByPk(1);
if (user) await user.destroy();
```

### Egyéb hasznos műveletek

Beszúrás vagy frissítés (ha már létezik):
```javascript
await User.upsert({
  id: 1, // Ha az ID létezik, frissít, ha nem, beszúrja
  username: 'johndoe',
  email: 'johndoe@newmail.com'
});

```

Rekordszám lekérdezése:
```javascript
const count = await User.count();
```

## Operátorok használata

A Sequelize `Op` (Operators) egy objektum, amely lehetővé teszi az SQL operátorok használatát a `where` feltételekben. Ez segítséget nyújt összetettebb lekérdezések írásához anélkül, hogy nyers SQL-t kellene használni.

Az operátor importálása a következőképpen történik:
```javascript
const { Op } = require('sequelize');
```

### Gyakran használt operátorok

Egyenlőség és összehasonlító operátorok:

| Operátor    | SQL megfelelője | Példa                                     |
| ----------- | --------------- | ----------------------------------------- |
| `Op.eq`     | `=`             | `{ age: { [Op.eq]: 25 } }` → `age = 25`   |
| `Op.ne`     |	`!=`            |	`{ age: { [Op.ne]: 30 } }` → `age != 30`  |
| `Op.gt`     |	`>`             |	`{ age: { [Op.gt]: 18 } }` → `age > 18`   | 
| `Op.gte`    |	`>=`            |	`{ age: { [Op.gte]: 21 } }` → `age >= 21` | 
| `Op.lt`     |	`<`             |	`{ age: { [Op.lt]: 65 } }` → `age < 65`   | 
| `Op.lte`    |	`<=`            |	`{ age: { [Op.lte]: 60 } }` → `age <= 60` |

Példa: Lekérdezzük az összes felhasználót, akik legalább 18 évesek
```javascript
const users = await User.findAll({
  where: {
    age: { [Op.gte]: 18 }
  }
})
```

Több értékkel való egyezés:
| Operátor    | SQL megfelelője | Példa                                                        |
| ----------- | --------------- | ------------------------------------------------------------ |
| `Op.in`	    | IN	            | `{ age: { [Op.in]: [25, 30, 35] } }` → `age IN (25, 30, 35)` |
| `Op.notIn`	| NOT IN	        | `{ age: { [Op.notIn]: [18, 21] } }` → `age NOT IN (18, 21)`  |

Példa:
```javascript
const users = await User.findAll({
  where: {
    age: { [Op.in]: [20, 25, 30] }
  }
})
```

Mintakeresés (`LIKE`):
| Operátor      | SQL megfelelője | Példa                                                                         |
| ------------- | --------------- | ----------------------------------------------------------------------------- |
| `Op.like`     |	`LIKE`	        | `{ username: { [Op.like]: 'J%' } }` → `username LIKE 'J%'`                    |
| `Op.notLike`  |	`NOT LIKE`	    | `{ email: { [Op.notLike]: '%@gmail.com' } }` → `email NOT LIKE '%@gmail.com'` |

Példa: Keresünk minden felhasználót, akinek a neve "J"-vel kezdődik
```javascript
const users = await User.findAll({
  where: {
    username: { [Op.like]: 'J%' }
  }
})
```
Példa: Keresünk mindenkit, aki nem Gmail-es e-mail címet használ
```javascript
const users = await User.findAll({
  where: {
    email: { [Op.notLike]: '%@gmail.com' }
  }
})
```