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

Egy felhasználó több posztot írhat:
```javascript
User.hasMany(Post, { foreignKey: "userId", onDelete: "CASCADE" });
Post.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
```