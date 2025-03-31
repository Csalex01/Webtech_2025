const express = require("express")
const sequelize = require("./config/database")
const path = require("path")
const expressLayouts = require("express-ejs-layouts");

const homeRouter = require("./routes/home");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const categoriesRouter = require("./routes/categories");
const postCategoriesRouter = require("./routes/postCategories");

const app = express()
const PORT = 3000

// EJS as templating engine
app.set("view engine", "ejs")

// Set views directory (where the templates are stored)
app.set("views", path.join(__dirname, "views"))

// Serve static files (CSS, JS, images, etc...)
app.use(express.static(path.join(__dirname, "public")))

app.use(expressLayouts);
app.set("layout", "layout"); // Default layout file

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use("/", homeRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/categories", categoriesRouter);
app.use("/postCategories", postCategoriesRouter);

app.listen(PORT, () => console.log(`✅> Server running on PORT ${PORT}.`))