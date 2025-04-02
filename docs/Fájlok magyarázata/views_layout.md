# views/layout.ejs

Ez a HTML sablon egy Express alkalmazás alapvető struktúráját mutatja be, ahol Sequelize integrációval dolgozol. Az alábbiakban részletezem a főbb részeket:

### Kódrészlet magyarázata:

#### 1. Alap HTML struktúra:
```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sequelize + Express</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
  <%- include("partials/navbar") %>
  <div class="container mt-5">
    <%- body %>
  </div>
</body>
</html>
```

### Magyarázat:

1. Meta információk:
    - A `meta charset="UTF-8"` biztosítja, hogy a dokumentum karakterkódolása UTF-8 legyen, amely támogatja az összes karaktert.
    - A `meta name="viewport" content="width=device-width, initial-scale=1.0"` reszponzív dizájnt biztosít, tehát a weboldal jól fog kinézni bármilyen eszközön.

2. Cím:
    - A `<title>Sequelize + Express</title>` a böngésző fülén megjelenő oldalcímet adja meg.

3. Bootstrap CSS:
    - A `link` tag betölti a Bootstrap 5.3.3 verzióját a stílusokhoz, így gyorsan reszponzív és jól kinéző felületeket hozhatsz létre.

#### 2. Navigációs sáv (navbar):
```html
<%- include("partials/navbar") %>
```
- Ez a kódrészlet a `navbar` részét egy külön fájlból tölti be (`partials/navbar`), amely tartalmazhat navigációs linkeket, például a kezdőlapot, bejegyzéseket, felhasználókat, stb. 
- Az EJS szintaxisa (`<%- include(...) %>`) arra szolgál, hogy egy másik EJS fájlt beágyazzunk a jelenlegi fájlba.

#### 3. Fő tartalom:
```html
<div class="container mt-5">
  <%- body %>
</div>
```
- A `<%- body %>` EJS szintaxis az aktuális oldal dinamikus tartalmát fogja helyettesíteni. A `body` változó tartalma az Express útvonalhoz rendelt nézetből kerül beillesztésre.
- A `container mt-5` osztályok a Bootstrap-től származnak. A `container` középre igazítja a tartalmat, a `mt-5` pedig margót ad a tetején, hogy legyen hely a navigációs sáv és az oldal többi része között.
