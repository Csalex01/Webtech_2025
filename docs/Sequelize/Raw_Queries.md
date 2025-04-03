# Raw Query

A **raw query** (nyers lekérdezés) a Sequelize-ben egy SQL parancs közvetlen végrehajtását jelenti anélkül, hogy a Sequelize ORM által biztosított absztrakciós rétegen keresztül menne. Ez hasznos lehet, ha egy összetettebb SQL lekérdezést kell végrehajtani, amit a Sequelize modellek és metódusok nem tudnak hatékonyan kezelni.  

## **Raw query használata**  
A `sequelize.query()` metódussal hajthatunk végre nyers SQL lekérdezéseket.

### **Alapvető szintaxis**
```javascript
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

(async () => {
  try {
    const [results, metadata] = await sequelize.query("SELECT * FROM Users");
    console.log(results); // Az eredményeket adja vissza
  } catch (error) {
    console.error("Hiba történt:", error);
  }
})();
```
A `sequelize.query()` metódus egy **promisszal** tér vissza, amely két elemből álló tömböt ad vissza:
1. **results** – a lekérdezés eredménye, amely tömb vagy objektum lehet attól függően, hogy milyen típust adtunk meg.
2. **metadata** – a lekérdezés végrehajtásával kapcsolatos metainformációk, például az érintett sorok száma.

---

### **Paraméterezett lekérdezések (SQL Injection elleni védelem)**
A Sequelize támogatja a változók biztonságos beillesztését a lekérdezésekbe `replacements` vagy `bind` segítségével.

#### **1. `replacements` használata**
Ez a módszer a `?` vagy a `:kulcs` helyőrzőkkel működik:
```javascript
const userId = 1;

const [user] = await sequelize.query(
  "SELECT * FROM Users WHERE id = :id",
  { replacements: { id: userId }, type: Sequelize.QueryTypes.SELECT }
);

console.log(user);
```
A `replacements` automatikusan beszúrja az értékeket, így elkerülhető az SQL injection.

---

#### **2. `bind` használata (másik megoldás)**
A `bind` hasonló, de inkább a **stored procedure-öknél** és tranzakcióknál hasznos.
```javascript
const userId = 1;

const [user] = await sequelize.query(
  "SELECT * FROM Users WHERE id = $id",
  { bind: { id: userId }, type: Sequelize.QueryTypes.SELECT }
);

console.log(user);
```
A `bind` is megakadályozza az SQL injection támadásokat.

---

### **SQL műveletek típussal (`QueryTypes`)**
A `type` opció segítségével megadható, hogy milyen típusú SQL műveletet hajtunk végre:
```javascript
const { QueryTypes } = require('sequelize');

const users = await sequelize.query("SELECT * FROM Users", {
  type: QueryTypes.SELECT // Csak az adatokat adja vissza, nem a metainformációt
});

console.log(users);
```
További `QueryTypes` lehetőségek:
- `SELECT` – adatok lekérdezése
- `INSERT` – új rekord beszúrása
- `UPDATE` – meglévő rekord módosítása
- `DELETE` – rekord törlése
- `RAW` – nyers SQL végrehajtása

---

### **Adatmódosítás nyers SQL-lel**
```javascript
await sequelize.query(
  "UPDATE Users SET name = :name WHERE id = :id",
  {
    replacements: { name: "Új név", id: 1 },
    type: QueryTypes.UPDATE
  }
);
```

---

### **Összegzés**
- A `sequelize.query()` metódussal lehet **nyers SQL lekérdezéseket** végrehajtani.
- A `replacements` és `bind` megakadályozza az **SQL injection** támadásokat.
- A `QueryTypes` segítségével meghatározható a végrehajtott SQL művelet típusa.
- Nyers lekérdezések akkor hasznosak, ha az ORM funkcionalitása nem elegendő egy adott feladathoz.

Ha valami konkrétabb példát szeretnél látni a saját projektedhez, szólj! 😊