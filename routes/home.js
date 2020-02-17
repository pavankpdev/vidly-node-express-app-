const express = require("express");
const router = express.Router();

//homepage route
router.get("/", (_, res) => {
  res.render("index", { title: "Vidly", message: "HELLO KP" });
});

module.exports = router;
