# Sequelize integrálása Express webapplikációval

## Tartalomjegyzék

### Sequelize

1. [Sequelize ismertető](./docs/Sequelize/Sequelize%20Ismertető.md)
2. [Alapvető adattípusok](./docs/Sequelize/Alapvető_Sequelize_Adattípusok.md)
3. [Adatbázis létrehozása és kapcsolat tesztelése](./docs/Sequelize/Adatbázis_Létrehozása_és_Kapcsolat_Tesztelése.md)
4. [Modellek felépítése és adatbázis szinkronizálása](./docs/Sequelize/Modellek_Felépítése.md)
5. [Alapvető műveletek](./docs/Sequelize/Alapvető_Műveletek.md)
6. [Operátorok használata](./docs/Sequelize/Operátorok_használata.md)

### Fájlok magyarázata

Konfigurációs fájlok

7. [config/database.js](./docs/Fájlok%20magyarázata/config_database.js.md)

Modellek

8. [models/Category.js](./docs/Fájlok%20magyarázata/models_Category.js.md)
9. [models/Comment.js](./docs/Fájlok%20magyarázata/models_Comment.js.md)
10. [models/Post.js](./docs/Fájlok%20magyarázata/models_Post.js.md)
11. [models/User.js](./docs/Fájlok%20magyarázata/models_User.js.md)
12. [models/index.js](./docs/Fájlok%20magyarázata/models_index.js.md)

## Program struktúrája

A program struktúrája a következő:

- `config/`: Konfigurációs fájlok
  - `database.js`: Adatbázis konfigurációjának meghatározása

- `db/`: Adatbázis tárolása
  - `database.sqlite`: Az adatbázis

- `models/`: Modellek
  - `index.js`: Modellek közötti kapcsolat meghatározása (egy-egy, egy-több)

- `node_modules/`: Telepített valamint szükséges Node modulok

- `public/`: Statikus fájlok

- `routes/`: Route-ok (CRUD műveletek)

- `views/`: Különböző route-hoz tartozó nézetek
  - `categories/`: Kategória nézetek
    - `edit.ejs`: Kategória szerkesztése
    - `index.ejs`: Kategóriák listázása
    - `show.ejs`: Egy kategória megtekintése
  - `comments/`
  - `partials/`: Részleges nézetek
    - `navbar.ejs`: Navigációs menü
  - `postCategories/`
  - `posts/`
    - `omments.ejs`: Kommentek megjelenítése
  - `users/`
  - `home.ejs`: Kezdőoldal
  - `layout.ejs`: Template layout meghatározása

- `seed.js`: Adatbázis feltöltése
- `server.js`: Express szerver futtatása
