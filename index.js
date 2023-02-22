const express = require("express");
const path = require("path");

const app = express();

const bodyParser = require("body-parser");
const hbs = require("hbs");
const mongo = require('./util/database');

const copyleaksContro = require("./controllers/copyleaks");

const webhookRoutes = require('./routes/webhook');
const fetchRoutes = require('./routes/fetch');
const checkProcessRoutes = require('./routes/checkProcess');
const publicRoutes = require('./routes/public');
const authRoutes = require('./routes/auth');
const route404 = require('./routes/404');

const viewsPath = path.join(__dirname, "views");
const staticPath = path.join(__dirname, "public");

// Setting Up Static Path (public folder)
app.use(express.static(staticPath));

// Setting Up Templating Engine.
app.set("view engine", "hbs");
app.set("views", viewsPath);

/* Code starts Here */

// Middlewares to parse incoming request bodies.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handling Routes
app.use(webhookRoutes);
app.use(fetchRoutes);
app.use(checkProcessRoutes);
app.use(authRoutes);
app.use(publicRoutes);
app.use(route404);

// mongo.mongo(() => {
// });

app.listen(3000);
