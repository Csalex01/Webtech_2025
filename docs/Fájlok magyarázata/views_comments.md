# views/comments/edit.ejs

Ez a kód egy komment szerkesztésére szolgáló űrlapot jelenít meg. A következőket tartalmazza:

1. Cím:  
   - A `<h3>Edit Comment</h3>` a felhasználót tájékoztatja, hogy egy kommentet szerkeszthet.

2. Űrlap:
   - Az űrlap a komment tartalmának szerkesztésére szolgál. A form action URL-je `/comments/<%= comment.id %>/edit`, ami biztosítja, hogy az űrlap a megfelelő kommenthez tartozó szerkesztési műveletet végezze el.
   - Az űrlapon található `textarea` mező a komment szövegének szerkesztésére szolgál. Az alapértelmezett értéke a `comment.content`, azaz a komment jelenlegi tartalmát jeleníti meg a felhasználónak.
   - A komment szövege kötelezően kitöltendő (`required`).

3. Gomb:
   - A "Update Comment" gomb a komment frissítését kezdeményezi.

4. Vissza gomb:
   - A "Back to Comments" gomb a felhasználót visszavezeti a kommentek listájához.

Ez az oldal tehát lehetővé teszi a felhasználó számára, hogy szerkessze a már meglévő kommentjét, és azt elmentve visszatérjen a kommentek listájához.

# views/comments/index.ejs

Ez a kód az összes komment megjelenítésére szolgáló táblázatot tartalmazza, valamint lehetőséget ad a kommentek kezelésére (megtekintés, módosítás, törlés). A következő részekből áll:

1. Cím:
   - A `<h3>All Comments</h3>` az oldal címét jelöli, ami azt jelzi, hogy az összes kommentet jelenítjük meg.

2. Tábla:
   - Az összes kommentet táblázatos formában jeleníti meg. A táblázatban 4 oszlop található: Associated Post (Hozzá tartozó bejegyzés), User (Felhasználó), Comment (Komment szövege), és Actions (Műveletek).
   
   A táblázat adatai:
   - Associated Post: A kommenthez tartozó bejegyzés címe. A cím egy link, amely a bejegyzés részleteit jeleníti meg. A hosszú címek rövidítve, 30 karakterre vágva jelennek meg.
   - User: A kommentet írta felhasználó neve, amely egy link, ami a felhasználó profiljára vezet.
   - Comment: A komment szövege.
   - Actions: A komment kezelésére szolgáló műveletek:
     - View Button: A komment részletes megtekintésére szolgáló gomb.
     - Modify Button: A komment szerkesztésére szolgáló gomb.
     - Delete Button: A komment törlésére szolgáló gomb. A gomb megnyomása előtt egy megerősítő kérdést jelenít meg a felhasználónak (`Are you sure you want to delete this comment?`), hogy biztosan törölni szeretné a kommentet.

3. Dinamikus adatok:
   - Az összes kommentet a `comments` tömbből rendereljük ki a `forEach` ciklus segítségével.
   - Minden kommenthez tartozik egy bejegyzés és egy felhasználó, ezeket a `comment.post` és `comment.user` objektumok biztosítják.

Ez az oldal lehetővé teszi a felhasználók számára, hogy áttekintsék az összes kommentet, és egyszerű műveleteket hajtsanak végre (megjelenítés, szerkesztés, törlés) az egyes kommentekkel.

# views/comments/show.ejs

Ez a kód egy komment részletes nézetét jeleníti meg. A következő elemekből áll:

1. Cím és Komment Témája:
   - A `<h1>Comment Details</h1>` cím azt jelzi, hogy ez a komment részletes nézete.

2. Komment tartalma:
   - A komment tartalma a `<%= comment.content %>` változó segítségével jelenik meg, amely a komment szövegét tartalmazza.
   - A `<%= comment.createdAt.toDateString() %>` az adott komment létrehozásának dátumát jeleníti meg, amely a `createdAt` dátumformátumból származik, és az `toDateString()` metódus segítségével az egyszerű, emberi olvasható formátumban kerül kiírásra.

3. Műveletek:
   - Modify Button (Módosítás gomb): A komment szerkesztésére szolgáló gomb, amely a `/comments/<%= comment.id %>/edit` URL-re mutat, hogy lehetővé tegye a komment módosítását.
   - Delete Button (Törlés gomb): A komment törlésére szolgáló gomb. A törlés előtt egy megerősítő párbeszédablak jelenik meg a `confirmDelete()` JavaScript függvény segítségével, amely a `window.confirm()` metódust használja. Ha a felhasználó megerősíti a törlést, a törlés végrehajtódik. A gomb a `/comments/<%= comment.id %>/delete` URL-t hívja meg POST kéréssel.

4. Visszaváltó gomb:
   - A Back to Comments gomb visszavezet az összes kommentet tartalmazó listára, a `/comments` URL-en keresztül.

5. JavaScript:
   - A `confirmDelete()` függvény egy egyszerű megerősítést biztosít a törlés előtt. Ha a felhasználó rákattint a törlés gombra, a `window.confirm()` párbeszédablak megjelenik, amely kérdezi, hogy biztosan törölni akarja-e a kommentet. Ha a felhasználó "OK"-t választ, a törlés végrehajtódik. Ha "Mégsem"-et választ, a törlés nem történik meg.

Ez az oldal lehetővé teszi a felhasználók számára, hogy megtekintsék a kommentek részleteit, szerkesszék vagy töröljék azokat, vagy visszatérjenek az összes komment listájára.