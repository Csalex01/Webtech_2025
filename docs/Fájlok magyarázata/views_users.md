# views/users/edit.ejs

Ez a kódrészlet egy User (felhasználó) szerkesztési űrlapot tartalmaz, ahol a felhasználó adatainak módosítása történhet.

### Kódrészlet magyarázata:

#### 1. Űrlap cím (h1):
```html
<h1>Edit User</h1>
```
- Az oldal címe, amely arra utal, hogy a felhasználó adatainak szerkesztésére van lehetőség.

#### 2. Form action és method:
```html
<form action="/users/<%= user.id %>/update" method="POST">
```
- Az űrlap a POST módszert használja, és az adatok a `/users/:id/update` URL-re kerülnek küldésre, ahol `:id` az aktuális felhasználó azonosítóját helyettesíti (`<%= user.id %>`).
  
#### 3. Név mező:
```html
<div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" id="name" name="name" value="<%= user.name %>" required>
</div>
```
- A felhasználó nevét tartalmazó mező. Az értéke az `user.name` alapján van kitöltve, ami az aktuális felhasználó nevét jeleníti meg. A mező kötelező (`required`).

#### 4. Email mező:
```html
<div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" name="email" value="<%= user.email %>" required>
</div>
```
- Az email cím mezője, amely az `user.email` alapján van előtöltve. Ez is kötelező mező.

#### 5. Submit és Cancel gombok:
```html
<button type="submit" class="btn btn-success">Update User</button>
<a href="/users" class="btn btn-secondary">Cancel</a>
```
- Az Update User gomb elküldi az űrlapot a szervernek, hogy a felhasználói adatokat frissítse.
- A Cancel gomb visszairányítja a felhasználót a `/users` oldalra, anélkül, hogy módosítaná az adatokat.

# views/users/index.ejs

Ez a kódrészlet egy felhasználó létrehozására szolgáló űrlapot és a felhasználók listáját tartalmazza. A felhasználókat meg lehet nézni, módosítani, vagy törölni az oldalon.

### Kódrészlet magyarázata:

#### 1. Új felhasználó létrehozása:
```html
<h3>Create a New User</h3>

<form action="/users/create" method="POST">
    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" name="name" id="name" class="form-control" placeholder="Enter name" required>
    </div>

    <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" name="email" id="email" class="form-control" placeholder="Enter email" required>
    </div>

    <button type="submit" class="btn btn-primary">Create User</button>
</form>
```
- Cím: Az oldal célja, hogy új felhasználót hozzunk létre.
- Form action: Az űrlap adatokat a `/users/create` URL-re küldi POST kéréssel.
- Név és Email mezők: Két alapvető mező (név és email) van, melyeket kötelező kitölteni.
- Submit gomb: A felhasználó létrehozása az űrlap elküldésével történik.

#### 2. Felhasználók listája:
```html
<hr>

<h1>All Users</h1>

<hr>

<table class="table table-bordered">
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <% users.forEach(user => { %>
            <tr>
                <td><%= user.name %></td>
                <td><%= user.email %></td>
                <td>
                    <!-- View Button -->
                    <a href="/users/<%= user.id %>" class="btn btn-info btn-sm">View</a>

                    <!-- Modify Button -->
                    <a href="/users/<%= user.id %>/edit" class="btn btn-warning btn-sm">Modify</a>

                    <!-- Delete Button (with confirmation) -->
                    <form action="/users/<%= user.id %>/delete" method="POST" class="d-inline" onsubmit="return confirm('Are you sure you want to delete this user?')">
                        <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                    </form>
                </td>
            </tr>
        <% }) %>
    </tbody>
</table>
```
- Felhasználók listája: Az összes felhasználó megjelenik egy táblázatban.
    - Név és Email: A felhasználók nevét és email címét jeleníti meg.
    - Műveletek: Minden felhasználóhoz három lehetőség tartozik:
        1. View: A felhasználó adatainak megtekintése.
        2. Modify: A felhasználó adatainak szerkesztése.
        3. Delete: A felhasználó törlése egy megerősítést követően.
      
# views/users/show.ejs

Ez a kódrészlet egy felhasználó részletes oldalát jeleníti meg, ahol megtekinthetjük a felhasználó nevét és email címét. Ezen kívül módosíthatjuk az adatokat, törölhetjük a felhasználót, vagy visszatérhetünk a felhasználók listájára.

### Kódrészlet magyarázata:

#### 1. Felhasználói adatok megjelenítése:
```html
<h1>User Details</h1>

<p><strong>Name:</strong> <%= user.name %></p>
<p><strong>Email:</strong> <%= user.email %></p>
```
- Felhasználói adatok: Az oldal megjeleníti a felhasználó nevét és email címét, amelyeket az `user` objektumból tölti be az EJS templating motor. Az `user.name` és `user.email` az aktuális felhasználó adatait tartalmazza.

#### 2. Műveleti gombok:
```html
<div class="mt-3">
    <!-- Modify Button -->
    <a href="/users/<%= user.id %>/edit" class="btn btn-warning">Modify</a>

    <!-- Delete Button (with confirmation) -->
    <form action="/users/<%= user.id %>/delete" method="POST" class="d-inline" onsubmit="return confirm('Are you sure you want to delete this user?')">
        <button type="submit" class="btn btn-danger">Delete</button>
    </form>

    <!-- Back Button -->
    <a href="/users" class="btn btn-secondary">Back to Users</a>
</div>
```
- Módosítás: A Modify gomb lehetővé teszi a felhasználó adatainak módosítását. A felhasználó szerkesztéséhez a `/users/<%= user.id %>/edit` URL-en található szerkesztő oldalra navigálunk.
  
- Törlés: A Delete gomb egy törlésre vonatkozó kérdést tesz fel a felhasználónak a törlés előtt. Ha a felhasználó megerősíti a törlést, a rendszer a `/users/<%= user.id %>/delete` URL-en küld egy POST kérést a felhasználó törlésére.
  
- Vissza gomb: A Back to Users gomb visszavisz a felhasználók listájára (`/users`).

