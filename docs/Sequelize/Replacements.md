# Replacements

A **replacements** a Sequelize-ben egy módja annak, hogy biztonságosan behelyettesítsünk értékeket egy nyers SQL lekérdezésbe. Ez az SQL **helyőrzők** (placeholders) segítségével történik, és megakadályozza az **SQL injection** támadásokat.

---

## **Hogyan működik a `replacements`?**
A `replacements` objektumban megadott értékek bekerülnek az SQL lekérdezésbe a megfelelő helyekre, de úgy, hogy közvetlenül nem manipulálják az SQL szöveget.

### **1. Index alapú helyőrzők (`?`)**
```javascript
const [users] = await sequelize.query(
  "SELECT * FROM Users WHERE age > ? AND city = ?",
  {
    replacements: [18, "Budapest"],
    type: Sequelize.QueryTypes.SELECT
  }
);

console.log(users);
```
- Az első `?` helyére `18` kerül.
- A második `?` helyére `"Budapest"` kerül.

---

### **2. Névtelen helyőrzők (`:kulcs`)**
```javascript
const [users] = await sequelize.query(
  "SELECT * FROM Users WHERE age > :age AND city = :city",
  {
    replacements: { age: 18, city: "Budapest" },
    type: Sequelize.QueryTypes.SELECT
  }
);

console.log(users);
```
- `:age` helyére `18` kerül.
- `:city` helyére `"Budapest"` kerül.

---

### **Miért fontos a `replacements`?**
1. **SQL injection elleni védelem**  
   - Ha közvetlenül fűznénk össze az SQL stringet, egy támadó rosszindulatú SQL kódot szúrhatna be.
   - Példa egy veszélyes SQL lekérdezésre (amit el kell kerülni!):
     ```javascript
     const city = "Budapest'; DROP TABLE Users; --";
     const query = `SELECT * FROM Users WHERE city = '${city}'`;
     ```
     Ez törölheti a teljes `Users` táblát!

2. **Olvashatóság és karbantarthatóság**  
   - A `replacements` segítségével átláthatóbb és újrahasználhatóbb kódot írhatunk.

3. **Egységes adatkezelés**  
   - Nem kell különböző formázásokat és karakter escaping-et alkalmazni.

Ha a **biztonság és megbízhatóság** fontos szempont a Sequelize-ben, akkor mindig ajánlott **replacements** vagy **bind** használata! 🚀