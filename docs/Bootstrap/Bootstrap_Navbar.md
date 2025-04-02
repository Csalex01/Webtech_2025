# Navigációs sáv (Navbar)

A **navigációs sáv** (más néven **navbar**) a weboldalak egyik legfontosabb eleme, amely segít a felhasználóknak a weboldalon belüli navigálásban. A **Bootstrap** könnyen használható navigációs sávot biztosít, amely reszponzív, vagyis különböző képernyőméretekhez alkalmazkodik, és rengeteg hasznos osztályt kínál a testreszabásához.

A navigációs sáv (navbar) alapvetően egy **flexbox** alapú konténer, amely tartalmazza a weboldal különböző navigációs linkjeit, logóját, keresőmezőt, menüt, és más interaktív elemeket.

### A Navigációs Sáv Alapvető Strukturája

Itt van egy egyszerű példa a navigációs sávra:

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">MyWebsite</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
  </div>
</nav>
```

### Fontos Osztályok és Elemei

1. **`<nav class="navbar">`**: Az egész navigációs sávot egy `<nav>` HTML elem tartja, amely a **Bootstrap `navbar`** osztályával rendelkezik. A `navbar` osztály az alapvető struktúrához szükséges stílust biztosítja.

2. **`navbar-expand-lg`**: Ez az osztály felelős a navigáció reszponzív viselkedéséért. Az `expand-lg` azt jelenti, hogy a navigációs sáv normál méretben (nagyobb képernyőkön) vízszintesen jelenik meg, míg kisebb képernyőkön (például mobiltelefonokon) egy **hamburger menü** formájában. Az `lg` azt jelenti, hogy a váltás akkor történik, amikor a képernyő szélessége eléri a **992px**-t.

3. **`navbar-brand`**: Ez az osztály az oldal logójához vagy nevéhez használt szöveget vagy képet stílusozza. A logóra kattintva általában az oldal főoldalára navigálunk.

4. **`navbar-toggler`**: Ez az osztály a menüt egy gombbal való megnyitásához szükséges. A menüt akkor használjuk, amikor a képernyő kisebb, és nem fér el az összes navigációs link. Ez a gomb mobil nézetben vagy kisebb képernyőkön jelenik meg, és a felhasználó tudja rajta keresztül elérni a navigációt.

5. **`navbar-collapse`**: Ez az osztály a navigációs sáv elemeit rejti el, amikor a képernyő kicsi, és újra megjeleníti őket, amikor a menüt megnyitják. Az ID, mint `navbarNav`, a `navbar-toggler` gombhoz tartozik, amely irányítja a navigációs menü megjelenését.

6. **`navbar-nav`**: Ez az osztály a navigációs linkek konténere. Az összes navigációs elem (linkek) egy `<ul>` (unordered list) elembe kerül, amelyhez ez az osztály tartozik.

7. **`nav-item`**: A navigációs elemek (linkek) egyesével az `nav-item` osztályhoz tartoznak. Ez egy listázott elem, amely biztosítja, hogy a linkek megfelelően legyenek elrendezve a sávban.

8. **`nav-link`**: Ez az osztály a tényleges navigációs linkek stílusozásáért felelős. A `nav-link` osztály biztosítja, hogy a linkek egységes stílusúak legyenek és jól illeszkedjenek a navigációs sávba.

9. **`active`**: Ez az osztály azt jelzi, hogy az adott elem aktív, azaz a felhasználó jelenleg ezen az oldalon van. Az aktív link általában kiemelésre kerül.

10. **`disabled`**: A `disabled` osztály alkalmazásával a linket inaktívvá tehetjük, így a felhasználó nem tud rákattintani.

### A Navigációs Sáv Reszponzív Jellemzői

Bootstrap navigációs sávja reszponzív, ami azt jelenti, hogy különböző eszközökön (mobil, tablet, desktop) más-más módon jelenik meg. Nagy képernyőkön a navigációs linkek vízszintesen jelennek meg, míg kisebb képernyőkön, például mobiltelefonokon, az elrendezés egy gombbal (hamburger menü) válik kiemelté.

### Példa Reszponzív Navigációra

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">MyWebsite</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">About</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Services</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Contact</a>
      </li>
    </ul>
  </div>
</nav>
```

### Navigációs Sáv Stílusai

A navigációs sáv színét is könnyen módosíthatjuk a Bootstrap osztályaival, például:

- `.navbar-light`: Világos háttérszínű navigációs sáv.
- `.navbar-dark`: Sötét háttérszínű navigációs sáv.
- `.bg-light`: Világos háttérszín a sáv számára.
- `.bg-dark`: Sötét háttérszín a sáv számára.
