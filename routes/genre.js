const express = require("express");
const Joi = require("@hapi/joi");
const genreModel = require("../model/genreModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const genres = await genreModel.find().sort("name");

    res.send(genres);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let genre = new genreModel({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
  } catch (error) {
    res.send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const genre = await genreModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name
      },
      { new: true }
    );
    if (!genre)
      return res.status(404).send("The genre with the given id was'nt found!");
    res.send(genre);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const genre = await genreModel.findByIdAndRemove(req.params.id);

    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");
    res.send(genre);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);

    const genre = await genreModel.findById(req.params.id);

    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");
    res.send(genre);
  } catch (error) {
    res.send(error.message);
  }
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required()
  });

  return schema.validate(genre);
}

module.exports = router;
