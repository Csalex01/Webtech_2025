# views/posts/edit.ejs

Ez a sablon az EJS (Embedded JavaScript) szintaxist használja egy blogbejegyzés szerkesztésére szolgáló űrlap megjelenítésére. A formában a felhasználó módosíthatja a bejegyzés címét, tartalmát és kategóriáit. 

### Részletes magyarázat:

1. Form kezdete:
   ```html
   <form action="/posts/<%= post.id %>/update" method="POST">
   ```
   - A form action attribútuma a `/posts/<%= post.id %>/update` URL-re mutat, ahol `<%= post.id %>` dinamikusan helyettesíti a bejegyzés ID-ját. Ez azt jelenti, hogy a formadatok egy POST kérésként kerülnek elküldésre a szerverre, ahol a bejegyzés frissítésére kerül sor.

2. Bejegyzés címe:
   ```html
   <div class="mb-3">
       <label for="title" class="form-label">Title</label>
       <input class="form-control" type="text" name="title" id="title" value="<%= post.title %>" required>
   </div>
   ```
   - A felhasználó módosíthatja a bejegyzés címét. Az input mező értéke dinamikusan beállítódik a `post.title` alapján, amely a meglévő bejegyzés címét tartalmazza.

3. Bejegyzés tartalma:
   ```html
   <div class="mb-3">
       <label for="content" class="form-label">Content</label>
       <textarea class="form-control" name="content" id="content" required><%= post.content %></textarea>
   </div>
   ```
   - A felhasználó a bejegyzés tartalmát módosíthatja. A textarea alapértelmezett értéke a `post.content` alapján kerül beállításra.

4. Kategóriák kiválasztása:
   ```html
   <div class="mb-3">
       <label for="categories" class="form-label">Categories</label>
       <div>
           <% categories.forEach(category => { %>
               <div class="form-check">
                   <input type="checkbox" class="form-check-input" name="categories[]" value="<%= category.id %>"
                   <% if (post.categories.some(postCategory => postCategory.id === category.id)) { %> checked <% } %> >
                   <label class="form-check-label" for="categories"><%= category.name %></label>
               </div>
           <% }) %>
       </div>
   </div>
   ```
   - Itt egy lista jelenik meg az összes elérhető kategóriáról. Minden kategória egy checkbox-ként van megjelenítve.
   - `<%= category.name %>`: A kategória neve jelenik meg a checkbox mellett.
   - `<% if (post.categories.some(postCategory => postCategory.id === category.id)) { %> checked <% } %>`: Ez a feltétel ellenőrzi, hogy a bejegyzéshez tartozik-e a kategória (azaz szerepel-e a `post.categories` tömbben). Ha igen, a checkbox be lesz jelölve.

5. Frissítés gomb:
   ```html
   <button type="submit" class="btn btn-primary">Update Post</button>
   ```
   - A form elküldésére szolgáló gomb. Amikor a felhasználó rákattint, a bejegyzés frissítése történik meg a szerveren.

# views/posts/index.ejs

Ez a kód egy új blogbejegyzés létrehozására szolgáló űrlapot és az összes blogbejegyzés listázására szolgáló táblázatot tartalmaz. Az űrlap és a táblázat az EJS templating motort használja, hogy dinamikusan jelenítse meg az adatokat.

### Részletes magyarázat:

#### 1. Új bejegyzés létrehozása (Űrlap):

```html
<h3>Create a New Post</h3>

<form class="form" action="/posts/create" method="POST">
```
- Űrlap kezdete: Az űrlap a `/posts/create` URL-re küldi el a POST kérését, ahol a bejegyzés létrehozására kerül sor.

##### a. Cím megadása:

```html
<div class="mb-3">
    <label for="title" class="form-label">Title</label>
    <input class="form-control" type="text" name="title" id="title" placeholder="Title" required>
</div>
```
- A felhasználó itt adhatja meg a bejegyzés címét. A `required` attribútum biztosítja, hogy a cím megadása kötelező legyen.

##### b. Tartalom megadása:

```html
<div class="mb-3">
    <label for="content" class="form-label">Content</label>
    <textarea class="form-control" name="content" id="content" placeholder="Content" required></textarea>
</div>
```
- A felhasználó itt adhatja meg a bejegyzés tartalmát. A `textarea` lehetővé teszi, hogy több soros szöveget írjon.

##### c. Felhasználó hozzárendelése:

```html
<div class="mb-3">
    <label for="userId" class="form-label">Assign User</label>
    <select class="form-select" name="userId" id="userId" required>
        <option value="">Select a User</option>
        <% users.forEach(user => { %>
            <option value="<%= user.id %>"><%= user.name %></option>
        <% }) %>
    </select>
</div>
```
- A felhasználó kiválaszthatja, hogy melyik felhasználóhoz szeretné rendelni a bejegyzést. Az EJS ciklus (`<% users.forEach(user => { %>`) segítségével jelenik meg az összes felhasználó neve egy `<select>` elemen belül. A `value` az egyes felhasználók ID-ját tartalmazza, és a neve jelenik meg a legördülő listában.

##### d. Űrlap elküldése:

```html
<button type="submit" class="btn btn-primary">Create Post</button>
```
- Ez a gomb küldi el az űrlapot, hogy létrehozza a bejegyzést.

#### 2. Bejegyzések listázása (Táblázat):

```html
<hr>

<h1>All posts</h1>

<hr>

<table class="table table-bordered">
  <thead>
      <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Actions</th>
      </tr>
  </thead>
  <tbody>
      <% posts.forEach(post => { %>
          <tr>
              <td><%= post.title %></td>
              <td><%= post.user.name %></td>
              <td>
                  <!-- View Button -->
                  <a href="/posts/<%= post.id %>" class="btn btn-info btn-sm">View</a>
                  <!-- Modify Button -->
                  <a href="/posts/<%= post.id %>/edit" class="btn btn-warning btn-sm">Modify</a>
                  <!-- Delete Button -->
                  <form action="/posts/<%= post.id %>/delete" method="POST" class="d-inline" onsubmit="return confirm('Are you sure you want to delete this post?')">
                      <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                  </form>
              </td>
          </tr>
      <% }) %>
  </tbody>
</table>
```
- Bejegyzések listázása: Az `EJS` ciklus (`<% posts.forEach(post => { %>`) segítségével jeleníti meg az összes bejegyzést egy táblázatban. Minden bejegyzés egy-egy sorban van megjelenítve, amely tartalmazza a bejegyzés címét, a szerző nevét, és az akciógombokat (Megtekintés, Módosítás, Törlés).

##### a. Bejegyzés címe:

```html
<td><%= post.title %></td>
```
- A bejegyzés címét jeleníti meg.

##### b. Bejegyzés szerzője:

```html
<td><%= post.user.name %></td>
```
- A bejegyzés szerzőjének nevét jeleníti meg, amely a kapcsolódó felhasználó `name` mezőjéből származik.

##### c. Akciók (Gombok):

- Megtekintés: A felhasználó a bejegyzés részletes nézetéhez ugrik a `/posts/<%= post.id %>` URL-re.
  ```html
  <a href="/posts/<%= post.id %>" class="btn btn-info btn-sm">View</a>
  ```

- Módosítás: A felhasználó a bejegyzés szerkesztéséhez ugrik a `/posts/<%= post.id %>/edit` URL-re.
  ```html
  <a href="/posts/<%= post.id %>/edit" class="btn btn-warning btn-sm">Modify</a>
  ```

- Törlés: A felhasználó törölheti a bejegyzést a form segítségével, amely POST kérést küld a `/posts/<%= post.id %>/delete` URL-re. A törlés előtt egy megerősítést kér, hogy biztosan törölni akarja-e a bejegyzést.
  ```html
  <form action="/posts/<%= post.id %>/delete" method="POST" class="d-inline" onsubmit="return confirm('Are you sure you want to delete this post?')">
      <button type="submit" class="btn btn-danger btn-sm">Delete</button>
  </form>
  ```

# views/posts/show.ejs

Ez a kód a "Post Show" oldal (show.ejs), ahol egyetlen poszt részletes nézete jelenik meg, beleértve a címét, tartalmát, kapcsolódó kategóriáit és kommentjeit. Emellett lehetőséget biztosít a poszt módosítására és törlésére, valamint új kommentek hozzáadására.

### 1. Poszt címe és szerzője:

```html
<h3><%= post.title %></h3>
By: <strong><%= post.user.name %></strong>
```
- A poszt címe egy `<h3>` elemben jelenik meg.
- A szerző neve vastagon jelenik meg közvetlenül a cím alatt, amely a `post.user.name` alapján jelenik meg.

### 2. Módosítás és törlés gombok:

```html
<div class="mt-3">
    <!-- Modify Button -->
    <a href="/posts/<%= post.id %>/edit" class="btn btn-warning">Modify</a>

    <!-- Delete Button (with confirmation) -->
    <form action="/posts/<%= post.id %>/delete" method="POST" class="d-inline" onsubmit="return confirm('Are you sure you want to delete this post?')">
        <button type="submit" class="btn btn-danger">Delete</button>
    </form>
</div>
```
- Modify Button: A felhasználó ide navigálhat, hogy módosítsa a posztot. A gomb a poszt szerkesztő oldalára vezet (`/posts/<%= post.id %>/edit`).
- Delete Button: Egy űrlap, amely törli a posztot a `/posts/<%= post.id %>/delete` útvonalra küldött `POST` kéréssel. Törlés előtt egy megerősítő ablak jelenik meg.

### 3. Poszt tartalma:

```html
<hr>
<p><%= post.content %></p>
```
- A poszt tartalmát egy `<p>` elem tartalmazza, amely a `post.content` változó értékét jeleníti meg.

### 4. Poszt kategóriái:

```html
<strong>Categories:</strong>
<ul>
    <% post.categories.forEach(category => { %>
        <li><%= category.name %></li>
    <% }) %>
</ul>
```
- A poszthoz tartozó kategóriák egy rendezetlen listában jelennek meg. Minden kategória neve egy `<li>` tag-ban jelenik meg.

### 5. Kommentek szekció:

```html
<h4>Comments</h4>
<% if (post.comments.length === 0) { %>
    <p>No comments yet.</p>
<% } else { %>
    <ul style="list-style: none;">
        <% post.comments.forEach(comment => { %>
            <li class="mb-2">
                <strong>@ <%= comment.user.name %>:</strong> <%= comment.content %>
            </li>
        <% }) %>
    </ul>
<% } %>
```
- No comments yet: Ha nincsenek kommentek, akkor egy üzenet jelenik meg, hogy "No comments yet".
- Comments list: Ha vannak kommentek, azok egy listában (`<ul>`) jelennek meg, ahol minden komment a szerző neve és tartalma alapján jelenik meg.

### 6. Új komment hozzáadása űrlap:

```html
<hr>

<!-- Form to add a comment -->
<h5>Add a Comment</h5>
<form action="/posts/<%= post.id %>/comments" method="POST">
    <div class="mb-3">
        <label for="userId" class="form-label">Assign User</label>
        <select class="form-select" name="userId" id="userId" required>
            <option value="">Select a User</option>
            <% users.forEach(user => { %>
                <option value="<%= user.id %>"><%= user.name %></option>
            <% }) %>
        </select>
    </div>

    <div class="mb-3">
        <label for="content" class="form-label">Comment</label>
        <textarea class="form-control" name="content" id="content" required></textarea>
    </div>

    <button type="submit" class="btn btn-primary">Add Comment</button>
</form>
```
- Comment form: Ez az űrlap lehetővé teszi, hogy új kommentet adjunk a poszthoz. A felhasználó kiválaszthatja a hozzászóló személyét a `<select>` elem segítségével, majd beírhatja a kommentet a `textarea` mezőbe.
- Az űrlap egy `POST` kérést küld a `/posts/<%= post.id %>/comments` URL-re, hogy hozzájáruljon egy új kommenthez a poszthoz.