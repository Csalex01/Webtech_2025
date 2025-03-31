# Operátorok használata

A Sequelize `Op` (Operators) egy objektum, amely lehetővé teszi az SQL operátorok használatát a `where` feltételekben. Ez segítséget nyújt összetettebb lekérdezések írásához anélkül, hogy nyers SQL-t kellene használni.

Az operátor importálása a következőképpen történik:
```javascript
const { Op } = require('sequelize');
```

## Egyenlőség és összehasonlító operátorok

| Operátor    | SQL megfelelője | Példa (Sequelize → SQL)                   |
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

##  Több értékkel való egyezés
| Operátor    | SQL megfelelője | Példa (Sequelize → SQL)                                      |
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

##  Mintakeresés (`LIKE`)
| Operátor      | SQL megfelelője | Példa (Sequelize → SQL)                                                       |
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

##  Tartományok
| Operátor         | SQL Megfelelője | Példa (Sequelize → SQL)                                                |
| ---------------- | --------------- | ---------------------------------------------------------------------- |
| `Op.between`  	 | `BETWEEN`	     | `{ age: { [Op.between]: [18, 30] } }` → `age BETWEEN 18 AND 30`        |
| `Op.notBetween`  | `NOT BETWEEN`	 | `{ age: { [Op.notBetween]: [40, 50] } }` → `age NOT BETWEEN 40 AND 50` |

Példa: Keresünk minden 18 és 30 év közötti felhasználót
```javascript
const users = await User.findAll({
  where: {
    age: { [Op.between]: [18, 30] }
  }
});
```

## Logikai operátorok

| Operátor         | SQL Megfelelője | Példa (Sequelize → SQL)                                                        |
| ---------------- | --------------- | ------------------------------------------------------------------------------ |
| `Op.and`         |	`AND`	         | `{ [Op.and]: [{ age: 25 }, { active: true }] }` → `age = 25 AND active = true` |
| `Op.or`          |	`OR	`          | `{ [Op.or]: [{ age: 25 }, { age: 30 }] }` → `age = 25 OR age = 30`             |
| `Op.not`         |	`NOT`	         | `{ age: { [Op.not]: 25 } }` → `NOT age = 25`                                   |

Példa: Keresünk minden felhasználót, aki 25 éves és aktív (be van jelentkezve)
```javascript
const users = await User.findAll({
  where: {
    [Op.and]: [
      { age: 25 },
      { active: true }
    ]
  }
});
```