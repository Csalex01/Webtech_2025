# models/index.js

Ez a fájl összekapcsolja az összes modellt, és beállítja az adatbázisban lévő kapcsolatokat a Sequelize ORM segítségével.

Szükséges modulok importálása:
```javascript
const sequelize = require("../config/database");

const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const { Category, PostCategory } = require("./Category"); 
```

### 1. User és Post kapcsolat:
```javascript
User.hasMany(Post, { foreignKey: "userId", onDelete: "CASCADE" });
Post.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
```
- User hasMany Post: A `User` modellek több `Post` modellt birtokolhatnak, azaz egy felhasználónak több posztja is lehet. A `userId` a kapcsolódó idegen kulcs, és ha egy felhasználót törölnek, akkor az összes posztja is törlődik (`onDelete: "CASCADE"`).
- Post belongsTo User: Mivel egy poszt egy felhasználóhoz tartozik, a `Post` modell tartalmazza a `userId` idegen kulcsot, amely az adott felhasználóra mutat.

### 2. User és Comment kapcsolat:
```javascript
User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });
```
- User hasMany Comment: Egy felhasználónak több kommentje is lehet.
- Comment belongsTo User: Mivel egy komment egy felhasználóhoz tartozik, a `Comment` modell tartalmazza a `userId` idegen kulcsot.

### 3. Post és Comment kapcsolat:
```javascript
Post.hasMany(Comment, { foreignKey: "postId", onDelete: "CASCADE" });
Comment.belongsTo(Post, { foreignKey: "postId" });
```
- Post hasMany Comment: Egy poszthoz több komment is tartozhat. A `postId` idegen kulcs az adott posztra mutat.
- Comment belongsTo Post: Mivel egy komment egy poszthoz tartozik, a `Comment` modell tartalmazza a `postId` idegen kulcsot.

### 4. Post és Category közötti kapcsolat (Many-to-Many):
```javascript
Post.belongsToMany(Category, { through: PostCategory, foreignKey: "postId", onDelete: "CASCADE" });
Category.belongsToMany(Post, { through: PostCategory, foreignKey: "categoryId" });
```
- Post.belongsToMany(Category): Egy poszthoz több kategória is tartozhat. A `through` kulcs azt jelzi, hogy a `PostCategory` modell a kapcsolótáblát jelöli, amely a posztokat és a kategóriákat összekapcsolja.
- Category.belongsToMany(Post): Egy kategóriához több poszt is tartozhat. A kapcsolótábla (`PostCategory`) tartalmazza mindkét modell idegen kulcsait (`postId` és `categoryId`).

### 5. PostCategory kapcsolótábla kapcsolatai:
```javascript
PostCategory.belongsTo(Post, { foreignKey: 'postId', onDelete: 'CASCADE' });
PostCategory.belongsTo(Category, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
```
- PostCategory.belongsTo(Post): A `PostCategory` kapcsolótábla egy poszthoz tartozik, és a `postId` idegen kulcsot tartalmazza.
- PostCategory.belongsTo(Category): A `PostCategory` kapcsolótábla egy kategóriához is tartozik, és a `categoryId` idegen kulcsot tartalmazza.

### 6. Törlési szabályok:
- Az onDelete: "CASCADE" beállítások biztosítják, hogy ha egy rekordot törölnek (pl. felhasználó, poszt vagy kategória), akkor a kapcsolódó rekordok is törlődnek automatikusan. Ez megakadályozza, hogy "árvákká" váljanak az adatbázisban.