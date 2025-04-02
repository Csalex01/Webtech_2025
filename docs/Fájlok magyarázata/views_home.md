# views/home.ejs

Ez a kódrészlet egy keresési funkciót valósít meg Express és Sequelize alkalmazásban. A felhasználók képesek keresni az adatbázisban különböző táblákban (felhasználók, bejegyzések, kommentek, kategóriák), és megtekinthetik a találatok listáját.

### Kódrészlet magyarázata:

#### 1. Keresési űrlap:
```html
<form action="/" method="GET" onsubmit="return validateSearch()">
  <input style="width: 300px; display: inline;" class="form-control" type="text" name="query" id="searchQuery"
    placeholder="Enter search term..." value="<%= searchQuery %>" required>

  <select style="width: 150px; display: inline;" class="form-select" name="table">
    <option value="users" <%= table === "users" ? "selected" : "" %>>Users</option>
    <option value="posts" <%= table === "posts" ? "selected" : "" %>>Posts</option>
    <option value="comments" <%= table === "comments" ? "selected" : "" %>>Comments</option>
    <option value="categories" <%= table === "categories" ? "selected" : "" %>>Categories</option>
  </select>

  <button class="btn btn-secondary" type="submit">Search</button>
</form>
```
- Keresési mező: A felhasználó itt adhatja meg a keresési kifejezést. A `query` mezőben történik a szöveges keresés.
  
- Táblázat kiválasztása: A legördülő menüből választható, hogy melyik táblában keresünk: felhasználók (`users`), bejegyzések (`posts`), kommentek (`comments`), vagy kategóriák (`categories`).

- Keresés gomb: A keresés elküldésére szolgál. A form elküldése előtt a `validateSearch()` függvény ellenőrzi, hogy a keresési mező ki van-e töltve.

#### 2. Keresési eredmények megjelenítése:
```html
<h2>Results</h2>

<% if (results.length > 0) { %>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name/Title</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      <% results.forEach(result => { %>
        <tr>
          <td><%= result.id %></td>
          <td>
            <a href="/<%= table %>/<%= result.id %>">
              <%= table === "users" ? result.name + " (" + result.email + ")" : table === "posts" ? result.title :
                table === "comments" ? result.content.substring(0, 50) + "..." : result.name %>
            </a>
          </td>
          <td>
            <a href="/<%= table %>/<%= result.id %>" class="btn btn-info btn-sm">View</a>
          </td>
        </tr>
      <% }); %>
    </tbody>
  </table>
<% } else { %>
  <p>No results found.</p>
<% } %>
```
- Eredmények táblázata: Ha vannak találatok, a rendszer egy táblázatban jeleníti meg őket.
  - Az ID és a Név/Cím oszlopban láthatóak az adott táblázat oszlopai.
  - A Details oszlop tartalmaz egy "View" gombot, amely az adott adat részletes megtekintésére irányít.

- Nincs találat: Ha nem található találat, a rendszer azt jelzi, hogy "No results found."

#### 3. Keresési validáció:
```html
<script>
  function validateSearch() {
    const query = document.getElementById("searchQuery").value.trim();
    if (!query) {
      alert("Please enter a search term.");
      return false; // Prevent form submission
    }
    return true;
  }
</script>
```
- A `validateSearch()` függvény ellenőrzi, hogy a keresési mező üres-e. Ha igen, akkor figyelmezteti a felhasználót, és megakadályozza a form elküldését.
