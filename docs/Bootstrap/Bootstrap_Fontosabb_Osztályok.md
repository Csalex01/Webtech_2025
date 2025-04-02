# Fontosabb osztályok

A Bootstrap számos fontos osztályt kínál a felhasználói felületek gyors létrehozásához. Az alábbiakban bemutatok néhány kulcsfontosságú osztályt, amelyek a leggyakrabban használatosak a design és a funkcionalitás megvalósításához:

### 1. **Konténerek (Containers)**
A konténer osztályok segítenek a tartalom középre igazításában és a marginok kezelésében.

- `.container`: Az oldal tartalmának központosítása és fix szélesség alkalmazása.
- `.container-fluid`: Az oldal teljes szélességét kitöltő konténer.

### 2. **Grid rendszer (Grid System)**
A grid rendszer segít a reszponzív elrendezések kialakításában. A Bootstrap 12 oszlopos rendszerre épít.

- `.row`: Egy sor a gridben, amely az oszlopokat tartalmazza.
- `.col`: Alap osztály a rácsos oszlopok számára. Használható például `.col-6` (6 oszlop széles), `.col-sm-4` (4 oszlop széles kis képernyőn).
- `.col-{breakpoint}-{size}`: Lehetővé teszi a különböző oszlopméretek beállítását különböző képernyőméretekhez (`.col-lg-4`, `.col-md-6`, stb.)

### 3. **Gombok (Buttons)**
Bootstrap gomb osztályai segítségével különböző stílusú és színű gombokat hozhatunk létre.

- `.btn`: Alap gombosztály.
- `.btn-primary`: Alapértelmezett kék gomb.
- `.btn-secondary`: Szürke színű gomb.
- `.btn-success`: Zöld színű gomb, sikeres műveletekhez.
- `.btn-danger`: Vörös színű gomb, veszélyes műveletekhez.
- `.btn-lg`, `.btn-sm`: Nagy és kicsi gombok.

### 4. **Szövegformázás (Typography)**
Bootstrap segít az alapvető szöveges elemek gyors stílusozásában.

- `.h1`, `.h2`, `.h3`, stb.: Fejlécek különböző szintjei.
- `.lead`: Kiemelt szöveg.
- `.text-center`: Középre igazított szöveg.
- `.text-right`: Jobbra igazított szöveg.
- `.text-muted`: Halványított (szürke) szöveg.
- `.font-weight-bold`: Félkövér szöveg.
- `.text-uppercase`: Minden karakter nagybetűsre alakítása.

### 5. **Űrlapok (Forms)**
A űrlapokhoz kapcsolódó osztályok lehetővé teszik az űrlapok stílusozását és reszponzivitását.

- `.form-control`: Alap űrlapvezérlő (input, textarea, select).
- `.form-group`: Űrlapelemek csoportosítása.
- `.form-check`: Jelölőnégyzetek (checkbox) és rádiógombok (radio buttons) csoportosítása.
- `.form-select`: Legördülő lista (select) stílusozása.

### 6. **Táblázatok (Tables)**
A táblázatok gyors formázása és reszponzív megjelenítése.

- `.table`: Alapértelmezett táblázat.
- `.table-bordered`: Szegélyek hozzáadása a táblázathoz.
- `.table-striped`: Váltakozó színek az egyes sorok között.
- `.table-hover`: Hover (egérmutatás) effektek a táblázat sorain.
- `.table-sm`: Kisebb táblázatok, kompaktabb elrendezéssel.

### 7. **Kártyák (Cards)**
A kártyák elrendezése és stílusa egyszerű és rugalmas megoldás.

- `.card`: Alap kártya osztály.
- `.card-header`: A kártya fejlécének stílusozása.
- `.card-body`: A kártya törzse, ahol a tartalom található.
- `.card-title`: Kártya cím.
- `.card-text`: Kártya szöveges tartalma.
- `.card-footer`: A kártya lábléce.

### 8. **Modális ablakok (Modals)**
A modális ablakok megjelenítése Bootstrap segítségével.

- `.modal`: Alap modális ablak.
- `.modal-dialog`: A modális ablak tartalmának tartó osztálya.
- `.modal-content`: A modális ablak belső tartalmának stílusa.
- `.modal-header`: A modális ablak fejlécének stílusa.
- `.modal-footer`: A modális ablak lábléce.

### 9. **Navigáció (Navigation)**
A navigációs elemek, mint például menük és lapozók, gyors stílusozása.

- `.navbar`: Alap navigációs sáv.
- `.navbar-brand`: A navigációs sáv márkájának vagy címének megjelenítése.
- `.navbar-nav`: A navigációs linkek gyűjtése.
- `.nav-item`: A navigációs elemek egyedi linkjei.
- `.nav-link`: A navigációs linkek stílusozása.

### 10. **Értesítések (Alerts)**
Bootstrap segítségével egyszerűen hozhatsz létre értesítéseket.

- `.alert`: Alap értesítő osztály.
- `.alert-primary`, `.alert-secondary`, `.alert-success`, `.alert-danger`, stb.: Az értesítések színkódolása a típus alapján.
- `.alert-dismissible`: Az értesítés bezárhatóvá tétele.

### 11. **Ikonok (Icons)**
A Bootstrap nem tartalmaz beépített ikonokat, de könnyen integrálható például a **Font Awesome** vagy **Bootstrap Icons** könyvtárak segítségével.
