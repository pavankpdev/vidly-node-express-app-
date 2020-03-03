const genres = require("./routes/genre");
const customer = require("./routes/customer");
const movies = require("./routes/movies");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/genre", genres);
app.use("/api/customer", customer);
app.use("/api/movies", movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
