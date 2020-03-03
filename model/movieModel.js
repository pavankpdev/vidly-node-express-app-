const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { GenreSchema } = require("./genreModel");
// mongoDB connection
mongoose
  .connect("mongodb://localhost/vidly", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected Kp..!"))
  .catch(() => console.log("Something Went wrong, not connected..!"));

const schemaMovie = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    required: true
  },
  genre: { type: GenreSchema, required: true },
  numberInStock: {
    type: Number,
    required: true
  },
  dailyRentalRate: {
    type: Number,
    required: true
  }
});

const ModelMovies = mongoose.model("movies", schemaMovie);

const validateMovies = movies => {
  const movieValidate = Joi.object({
    title: Joi.string()
      .min(3)
      .required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required()
  });

  return movieValidate.validate(movies);
};

module.exports.ModelMovies = ModelMovies;
module.exports.validateMovies = validateMovies;
