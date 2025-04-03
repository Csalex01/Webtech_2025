# Sequelize ismertető

A Sequelize dokumentációja:
- [Getting Started](https://sequelize.org/docs/v6/getting-started/)
- [API Reference](https://sequelize.org/api/v6/identifiers)

## Mi a Sequelize?

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