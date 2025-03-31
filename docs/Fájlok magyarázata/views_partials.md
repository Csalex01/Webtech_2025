# views/partials/navbar.ejs

Ez a kód egy navigációs sávot (navbar) hoz létre a weboldalon, amelyet a Bootstrap keretrendszer stílusai és osztályai alakítanak. Itt van, hogy mit csinálnak az egyes részek:

### HTML Struktúra:

1. `<nav>`:
   - A navigációs sáv (navbar) van itt, amely tartalmazza a weboldal navigációs elemeit. 
   - A `class="container mt-3 mx-auto navbar navbar-expand-lg"` osztályok biztosítják a sáv elhelyezését, a margót és az alap Bootstrap navbar stílust.
   - A `box-shadow` és `border-radius` inline stílusok a sávot árnyékolják, és lekerekítik a sarkait.

2. `<div class="container-fluid">`:
   - A `container-fluid` osztály biztosítja, hogy a navbar teljes szélességben kitöltse a képernyőt, míg a `container` osztály középre igazítja a tartalmát.

3. Logo:
   - Az `<a>` elem a logo-t tartalmazza, amely a főoldalra (`/`) vezet. A `img` tagben lévő kép 40px magas, és az `alt` attribútum biztosítja a kép alternatív szövegét.
   
4. Hamburger Menü (mobil nézetben):
   - A `<button>` elem a navbar mobil nézetében megjelenő hamburger menüt biztosítja. A `data-bs-toggle="collapse"` és `data-bs-target="#navbarSupportedContent"` attribútumok segítségével ez a gomb a navigációs menüt nyitja és zárja.

5. Navigációs menü:
   - A `<div class="collapse navbar-collapse" id="navbarSupportedContent">` tartalmazza az oldal navigációs linkjeit. Ha a képernyő kicsi, a menü összehúzódik.
   - A menü elemei az `<ul>` (unordered list) és az `<li>` (list item) tag-ek segítségével vannak elhelyezve.
   - Az egyes `nav-link` osztályú `<a>` elemek biztosítják a navigációt az oldalak között. Az `aria-current="page"` attribútum segít a hozzáférhetőségben, és a jelenlegi oldal kiemelésére szolgál.

### Stílus:

1. `box-shadow`: 
   - Egy enyhe árnyékot ad a navigációs sávnak, hogy emelkedjen a háttér előtt.

2. `border-radius`:
   - Lekerekíti a navbar sarkait, esztétikusabb megjelenést adva.

3. `height: 40px` (a logóra alkalmazva):
   - Beállítja a logo maximális magasságát 40px-re, így az nem nő túl nagyra, és illeszkedik a navigációs sávba.
