# Alapvető adattípusok

A Sequelize különböző adatbázis-adattípusokat támogat a DataTypes objektumon keresztül.

## Számok (numerikus típusok)

| Típus                 | Leírás                              |
| --------------------- | ----------------------------------- |
| `DataTypes.INTEGER`   | Egész szám (32-bites)               |
| `DataTypes.BIGINT`    | Nagyobb egész szám (64-bites)       |
| `DataTypes.FLOAT`     | Lebegőpontos szám                   |
| `DataTypes.DOUBLE`    | Dupla pontosságú lebegőpontos szám  |
| `DataTypes.DECIMAL`   | Pontos tizedesérték                 |

## Szöveg (string típusok)

| Típus                   | Leírás                                              |
| ----------------------- | --------------------------------------------------- |
| `DataTypes.STRING`      | Változó hosszúságú karakterlánc (max. 255 karakter) |
| `DataTypes.STRING(500)` | Változó hosszúságú karakterlánc (max. 500 karakter) |
| `DataTypes.TEXT`        | Hosszú szöveg (több ezer karakter)                  |
| `DataTypes.CHAR(10)`    | Fix hosszúságú szöveg (pl. kódokhoz)                |

## Dátum és idő (Date/Time típusok)

| Típus                 | Leírás                          |
| --------------------- | ------------------------------- |
| `DataTypes.DATE`      |	Dátum és idő                    |
| `DataTypes.DATEONLY`  |	Csak dátum (év, hónap, nap)     |
| `DataTypes.TIME`      |	Csak idő (óra, perc, másodperc) |

## Logikai érték (boolean típus)

| Típus               | Leírás                                    |
| ------------------- | ----------------------------------------- |
| `DataTypes.BOOLEAN` | Igaz (`true`) vagy hamis (`false`) érték  |

## Egyéb típusok

| Típus                                         | Leírás                                        |
| --------------------------------------------- | --------------------------------------------- |
| `DataTypes.UUID`                              |	Egyedi azonosító                              |
| `DataTypes.JSON`                              |	JSON adatok tárolása                          |
| `DataTypes.ENUM('small', 'medium', 'large')`  |	Korlátozott értékkészlettel rendelkező szöveg |
| `DataTypes.ARRAY(DataTypes.STRING)`           | Tömb (pl. PostgreSQL esetén)                  |
| `DataTypes.BLOB`                              | Bináris adat (pl. fájlok, képek tárolására)   |