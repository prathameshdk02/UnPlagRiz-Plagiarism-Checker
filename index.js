require("dotenv").config();

const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");

// Temporarily Storing Sessions Locally...
const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);
const hbs = require("hbs");

const { mongoConnect } = require("./util/database");

const app = express();

// const sessionStore = new MongoDBStore(
//   {
//     uri: process.env.DATABASE_MONGO_URI_NO_PARAMS,
//     databaseName: "UnPlagRizDB",
//     collection: "Sessions"
//   },
//   (err) => {
//     console.log(err);
//   }
// );

const webhookRoutes = require("./routes/webhook");
const fetchRoutes = require("./routes/fetch");
const checkProcessRoutes = require("./routes/checkProcess");
const publicRoutes = require("./routes/public");
const authRoutes = require("./routes/auth");
const route404 = require("./routes/404");

const viewsPath = path.join(__dirname, "views");
const staticPath = path.join(__dirname, "public");

// Setting Up Templating Engine.
app.set("view engine", "hbs");
app.set("views", viewsPath);

// Setting Up Static Path (public folder)
app.use(express.static(staticPath));

// Middlewares to parse incoming request bodies.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting up the Session Handler
app.use(
  session({
    secret: "aAdoASiDbhvjpnlcjvhaJOoJNlKJASDOF",
    resave: false,
    saveUninitialized: false,
    // store: sessionStore
  })
);

/* Code starts Here */

// Handling Routes
app.use(webhookRoutes);
app.use(fetchRoutes);
app.use(checkProcessRoutes);
app.use(authRoutes);
app.use(publicRoutes);
app.use(route404);

mongoConnect(() => {
  app.listen(process.env.PORT);
  console.log("Listening on the port!");
});
