# Sequelize integrálása Express webapplikációval

<img src="./public/images/logo.jpg" style="width: auto; height: 200px;" />

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

Útvonalak

13. [routes/categories.js](./docs/Fájlok%20magyarázata/routes_categories.js.md)
14. [routes/comments.js](./docs/Fájlok%20magyarázata/routes_comments.js.md)
15. [routes/home.js](./docs/Fájlok%20magyarázata/routes_home.js.md)
16. [routes/posts.js](./docs/Fájlok%20magyarázata/routes_posts.js.md)
17. [routes/users.js](./docs/Fájlok%20magyarázata/routes_users.js.md)

Nézetek

18. [views/categories](./docs/Fájlok%20magyarázata/views_categories.md) 
19. [views/comments](./docs/Fájlok%20magyarázata/views_comments.md)
20. [views/partials](./docs/Fájlok%20magyarázata/views_partials.md)
21. [views/posts](./docs/Fájlok%20magyarázata/views_posts.md)

## Szerver indítása

Az Express szerver futtatása a következő parancs segítségével történik:
```bash
$ node server.js
```
Amennyiben változtatni akarunk a fájlokon és nem akarjuk manuálisan újraindítani a szervert, a `nodemon` lehetőséget ad automatikus újraindításra:
```bash
$ nodemon server.js
```

Ha ez megtörtént akkor a webapplikációt eltudjuk érni a következő címen:
```
http://localhost:3000
```
vagy
```
http://127.0.0.1:3000
```

## Adatbázis létrehozása

Az adatbázist a következő parancs futtatásával hozzuk létre:
```bash
$ node seed.js
```

## Webapplikáció struktúrája

A webapplikáció struktúrája a következő:

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
  - `posts/`
    - `omments.ejs`: Kommentek megjelenítése
  - `users/`
  - `home.ejs`: Kezdőoldal
  - `layout.ejs`: Template layout meghatározása

- `seed.js`: Adatbázis feltöltése
- `server.js`: Express szerver futtatása
