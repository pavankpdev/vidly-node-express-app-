const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const middleware = require("./middleware/logger");
const genre = require("./routes/genre");
const home = require("./routes/home");
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(middleware.log);
app.use(middleware.auth);
app.use(helmet());
app.use("/api/genre", genre);
app.use("/", home);

// // Configuration
// console.log(`Application Name: ${config.get("name")}`);
// console.log(`Mail Server: ${config.get("mail.Host")}`);
// console.log(`Mail Password: ${config.get("mail.password")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled");
}

// app.use(logger);
//app listening on port provided by the system
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
