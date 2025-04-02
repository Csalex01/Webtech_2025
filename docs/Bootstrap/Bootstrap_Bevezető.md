# Bootstrap bevezető

A **Bootstrap** egy nyílt forráskódú front-end keretrendszer, amelyet a webfejlesztők használnak, hogy gyorsan és könnyen reszponzív, mobilbarát weboldalakat és alkalmazásokat hozzanak létre. Az első verzióját 2011-ben hozták létre a Twitter fejlesztői, és azóta az egyik legnépszerűbb CSS keretrendszerré vált. A Bootstrap könnyedén használható és testre szabható, és lehetővé teszi, hogy a fejlesztők gyorsan építhessenek felhasználóbarát és esztétikus weboldalakat.

### Fő jellemzők:

1. **Reszponzív dizájn**:
   - A Bootstrap automatikusan alkalmazkodik a különböző képernyőméretekhez. Használatával egy weboldal jól jelenik meg mobiltelefonokon, táblagépeken és asztali számítógépeken egyaránt.
   
2. **Kész CSS osztályok**:
   - A Bootstrap számos előre definiált CSS osztályt tartalmaz, amelyek segítenek a stílusok gyors alkalmazásában, például gombok, formák, táblázatok, navigációs sávok, kártyák stb.
   
3. **Grid rendszer**:
   - A Bootstrap rendelkezik egy grid (rács) rendszerrel, amely lehetővé teszi a fejlesztők számára, hogy rugalmas, oszlopokra bontott elrendezéseket hozzanak létre. A rendszer 12 oszlopra osztja az oldalt, amelyeket különböző méretű eszközökhöz igazíthatsz.

4. **Komponensek**:
   - A Bootstrap számos beépített komponenst tartalmaz, mint például:
     - Gombok, űrlapok, kártyák, modális ablakok
     - Navigációs sávok, listák, menük
     - Értesítések, eszköztárak, táblázatok
     - Alapvető CSS és JavaScript plugin-ek, mint a modal (felugró ablakok), tooltip-ek, dropdown menük, stb.
   
5. **JavaScript plugin-ek**:
   - A Bootstrap JavaScript plugin-jei segítenek az interaktív elemek megvalósításában, például slider-ek, karusszelek, modális ablakok, esernyők stb. Ezek a plugin-ek könnyen integrálhatóak az oldalon.

### Példa a használatra:

A Bootstrap alapvető használata nem igényel sok kódot. Az alábbi kód egy egyszerű gombot és egy reszponzív grid elrendezést mutat be:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bootstrap Example</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

  <!-- Button -->
  <button class="btn btn-primary">Click Me!</button>

  <!-- Grid Layout -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-4">
        <div class="p-3 border bg-light">Column 1</div>
      </div>
      <div class="col-4">
        <div class="p-3 border bg-light">Column 2</div>
      </div>
      <div class="col-4">
        <div class="p-3 border bg-light">Column 3</div>
      </div>
    </div>
  </div>

</body>
</html>
```