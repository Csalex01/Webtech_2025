# Alapvető műveletek

A Sequelize ORM-ben az alapvető műveletek az CRUD (Create, Read, Update, Delete) műveletek köré épülnek, amelyek lehetővé teszik az adatbázis-kezelést.

Fontos, hogy a műveletek egy aszinkron kontextusban kerüljenek meghívásra (async függvény).

## CREATE - Adatok beszúrása

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

## READ - Adatok lekérdezése

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

## UPDATE - Adatok módosítása

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

## DELETE - Adatok törlése

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

## Egyéb hasznos műveletek

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