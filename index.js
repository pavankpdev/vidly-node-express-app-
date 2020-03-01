const genres = require("./routes/genre");
const customer = require("./routes/customer");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/genre", genres);
app.use("/customer", customer);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
