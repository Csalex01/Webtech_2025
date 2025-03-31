# views/categories/edit.ejs

Ez a kód egy űrlapot jelenít meg, amely lehetővé teszi a felhasználók számára, hogy szerkesszék egy kategória nevét. Az űrlap a kategória jelenlegi nevét tölti be alapértelmezett értékként, és az id alapján frissíti azt a szerveren. A felhasználó a "Update Category" gombra kattintva küldi el az új nevet a szervernek, amely a kategória frissítését végzi el.

# views/categories/index.ejs

Ez a kód egy weboldal részletet mutat be, amely lehetővé teszi a felhasználók számára a kategóriák kezelését. A következő részeket tartalmazza:

1. Új kategória létrehozása:
   - Az első rész egy űrlapot jelenít meg, ahol a felhasználó megadhatja az új kategória nevét. A felhasználó a "Create Category" gombra kattintva küldi el az adatokat a szerverre, amely új kategóriát hoz létre.

2. Kategóriák listázása:
   - A második rész az összes kategóriát táblázatos formában jeleníti meg. Minden kategória neve és három művelet (View, Edit, Delete) szerepel:
     - View: A kategória megtekintésére vezet, ahol részletes információkat láthatunk róla.
     - Edit: A kategória szerkesztésére vezet, ahol a felhasználó módosíthatja a kategória nevét.
     - Delete: Az adott kategória törlésére szolgáló gomb. A törlés előtt egy megerősítő kérdés jelenik meg, hogy biztosan törölni akarja-e a felhasználó a kategóriát.

3. Új kategória létrehozásának lehetősége:
   - Az oldal alján egy "Create New Category" gomb található, amely az új kategória létrehozásához vezető űrlaphoz irányítja a felhasználót.

# views/categories/show.ejs

Ez a kód a kategória részleteit jeleníti meg, valamint az ahhoz tartozó bejegyzéseket. Az alábbiakat tartalmazza:

1. Kategória neve:
   - A `<h3><%= category.name %></h3>` rész a kategória nevét jeleníti meg.

2. Kapcsolódó bejegyzések:
   - A kód ellenőrzi, hogy a kategóriához van-e hozzárendelve bármilyen bejegyzés. Ha nincsenek, akkor a felhasználó számára egy üzenet jelenik meg: "No posts associated with this category."
   - Ha vannak bejegyzések, akkor azokat táblázatban jeleníti meg. Minden bejegyzéshez a címét és egy View gombot kínál, amely az adott bejegyzés részletes oldalára vezet.

3. Vissza gomb:
   - Az oldal alján található egy "Back to Categories" gomb, amely visszavezeti a felhasználót a kategóriák listájához.

Ez az oldal tehát bemutatja a kategóriák részleteit, valamint az összes kapcsolódó bejegyzést, ha vannak ilyenek.