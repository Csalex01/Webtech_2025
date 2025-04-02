# Sequelize integrálása Express webapplikációval

<img src="./public/images/logo.jpg" style="width: auto; height: 200px;" />

## Tartalomjegyzék

### Sequelize

1. **[Sequelize ismertető](./docs/Sequelize/Sequelize%20Ismertető.md)**  
   Áttekintést nyújt a Sequelize ORM-ről, annak céljáról és alapvető jellemzőiről.

2. **[Alapvető adattípusok](./docs/Sequelize/Alapvető_Sequelize_Adattípusok.md)**  
   Bemutatja a Sequelize által használt alapvető adattípusokat, például `STRING`, `INTEGER`, `BOOLEAN`, stb.

3. **[Adatbázis létrehozása és kapcsolat tesztelése](./docs/Sequelize/Adatbázis_Létrehozása_és_Kapcsolat_Tesztelése.md)**  
   Részletesen ismerteti, hogyan lehet adatbázist létrehozni és hogyan tesztelhetjük a kapcsolatot.

4. **[Modellek felépítése és adatbázis szinkronizálása](./docs/Sequelize/Modellek_Felépítése.md)**  
   Elmagyarázza a modellek létrehozását és azok adatbázissal való szinkronizálását Sequelize használatával.

5. **[Alapvető műveletek](./docs/Sequelize/Alapvető_Műveletek.md)**  
   Bemutatja az alapvető műveleteket, mint a rekordok létrehozása, olvasása, frissítése és törlése (CRUD műveletek).

6. **[Operátorok használata](./docs/Sequelize/Operátorok_használata.md)**  
   Részletes útmutató az operátorok használatáról a lekérdezésekben, például `Op.gt`, `Op.lt` stb.

### Fájlok magyarázata

#### Konfigurációs fájlok

7. **[config/database.js](./docs/Fájlok%20magyarázata/config_database.js.md)**  
   A konfigurációs fájl, amely az adatbázis kapcsolati beállításait tartalmazza, beleértve a felhasználónevet, jelszót és az adatbázis típusát.

#### Modellek

8. **[models/Category.js](./docs/Fájlok%20magyarázata/models_Category.js.md)**  
   A `Category` modell, amely a kategóriák tábláját reprezentálja az adatbázisban, és a kapcsolódó műveleteket tartalmazza.

9. **[models/Comment.js](./docs/Fájlok%20magyarázata/models_Comment.js.md)**  
   A `Comment` modell, amely a hozzászólások tábláját reprezentálja, és tartalmazza az ezekhez kapcsolódó műveleteket.

10. **[models/Post.js](./docs/Fájlok%20magyarázata/models_Post.js.md)**  
   A `Post` modell, amely a bejegyzéseket tároló táblát reprezentálja, és azok kezelésére szolgáló funkciókat tartalmaz.

11. **[models/User.js](./docs/Fájlok%20magyarázata/models_User.js.md)**  
   A `User` modell, amely a felhasználók adatait tárolja és a hozzájuk kapcsolódó műveleteket tartalmazza.

12. **[models/index.js](./docs/Fájlok%20magyarázata/models_index.js.md)**  
   A fájl, amely importálja és összekapcsolja az összes modellt, valamint inicializálja az adatbázis kapcsolatot.

#### Útvonalak

13. **[routes/categories.js](./docs/Fájlok%20magyarázata/routes_categories.js.md)**  
   Az útvonalak, amelyek a kategóriák kezelésére szolgálnak, például új kategória létrehozása vagy kategória törlése.

14. **[routes/comments.js](./docs/Fájlok%20magyarázata/routes_comments.js.md)**  
   Az útvonalak a hozzászólások kezelésére, beleértve azok létrehozását és törlését.

15. **[routes/home.js](./docs/Fájlok%20magyarázata/routes_home.js.md)**  
   A főoldal útvonalai, amelyek az alapvető oldalletöltési logikát tartalmazzák.

16. **[routes/posts.js](./docs/Fájlok%20magyarázata/routes_posts.js.md)**  
   Az útvonalak, amelyek a bejegyzések kezelésére szolgálnak, például új bejegyzés létrehozása vagy bejegyzés megtekintése.

17. **[routes/users.js](./docs/Fájlok%20magyarázata/routes_users.js.md)**  
   Az útvonalak, amelyek a felhasználók kezelésére vonatkoznak, beleértve a regisztrációt, a profil szerkesztését és törlését.

#### Nézetek

18. **[views/categories](./docs/Fájlok%20magyarázata/views_categories.md)**  
   A kategóriák megjelenítéséhez szükséges nézetek, amelyek a kategóriák listázását, létrehozását vagy módosítását tartalmazzák.

19. **[views/comments](./docs/Fájlok%20magyarázata/views_comments.md)**  
   A hozzászólások megjelenítéséhez szükséges nézetek, amelyek tartalmazzák a hozzászólások listázását és hozzáadását.

20. **[views/partials](./docs/Fájlok%20magyarázata/views_partials.md)**  
   A közös elemek (például fejlécek, láblécek, navigációs sávok) nézetei, amelyek az összes oldalra vonatkoznak.

21. **[views/posts](./docs/Fájlok%20magyarázata/views_posts.md)**  
   A bejegyzések megjelenítésére és kezelésére szolgáló nézetek, amelyek a bejegyzések részletezését és szerkesztését tartalmazzák.

22. **[views/users](./docs/Fájlok%20magyarázata/views_users.md)**  
   A felhasználói profilok megjelenítésére és kezelésére vonatkozó nézetek, például regisztráció, profil szerkesztés és törlés.

23. **[views/home](./docs/Fájlok%20magyarázata/views_home.md)**  
   A főoldal nézete, amely tartalmazza a weboldal fő tartalmát.

24. **[views/layout](./docs/Fájlok%20magyarázata/views_layout.md)**  
   A központi elrendezés, amely az alapvető HTML struktúrákat tartalmazza, és az oldal összes nézetéhez közös elemeket biztosít.

#### Bootstrap

25. **[Bootstrap bevezető](./docs/Bootstrap/Bootstrap_Bevezető.md)**  
   A Bootstrap CSS keretrendszer bemutatása, alapvető jellemzők és előnyök ismertetése.

26. **[Fontosabb osztályok](./docs/Bootstrap/Bootstrap_Fontosabb_Osztályok.md)**  
   A legfontosabb Bootstrap osztályok bemutatása, amelyek segítenek a dizájn és a felhasználói élmény gyors kialakításában.

27. **[Navigációs sáv (Navbar)](./docs/Bootstrap/Bootstrap_Navbar.md)**  
   A Bootstrap navigációs sávjának részletes bemutatása, annak testreszabása és használata a weboldalon.

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
