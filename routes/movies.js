const express = require("express");
const { GenreModel } = require("../model/genreModel");
const { validateMovies, ModelMovies } = require("../model/movieModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await ModelMovies.find();
    res.send(movies);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  res.send("sending all data");
});

router.post("/", async (req, res) => {
  const { error } = validateMovies(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  try {
    const genre = await GenreModel.findById(req.body.genreId);
    if (!genre) return res.status(404).send("Invalid Genre");
    let movie = new ModelMovies({
      title: req.body.title,
      genre: { _id: genre._id, name: genre.name },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    res.send(movie);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateMovies(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  res.send("sending all data");
});

router.delete("/:id", async (req, res) => {
  res.send("sending all data");
});

module.exports = router;
