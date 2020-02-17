const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");

// Data
const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" }
];

//function for input validation using JOI
const validateInput = body => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required()
  });
  // input validation with JOI
  return schema.validate(body);
};

router.get("/", (req, res) => {
  res.send(genres);
});

//Genres list route with parameter
router.get("/:id", (req, res) => {
  // Check for existance
  const isGenreExist = genres.find(
    genre => genre.id === parseInt(req.params.id)
  );

  if (!isGenreExist)
    return res.status(404).send("The genre with the given ID was not found.");

  //available! then display json object of the data
  res.send(isGenreExist);
});

// POST method for genre list
router.post("/", (req, res) => {
  // Input validation

  const { error } = validateInput(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  // Successfully accpet and update the genre list
  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  // Check for existance
  const isGenreExist = genres.find(
    genre => genre.id === parseInt(req.params.id)
  );

  if (!isGenreExist)
    return res.status(404).send("The genre with the given ID was not found.");
  // validate input
  const { error } = validateInput(req.body);
  // Fail! display msg
  if (error) return res.status(400).send(error.details[0].message);

  // Pass! display msg
  isGenreExist.name = req.body.name;
  res.send(isGenreExist);
});

router.delete("/:id", (req, res) => {
  // Check for existance
  const isGenreExist = genres.find(
    genre => genre.id === parseInt(req.params.id)
  );

  if (!isGenreExist)
    return res.status(404).send("The genre with the given ID was not found.");

  //delete genre
  const index = genres.indexOf(isGenreExist);
  genres.splice(index, 1);
  res.send(isGenreExist);
});

module.exports = router;
