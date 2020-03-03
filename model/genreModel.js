const mongoose = require("mongoose");
// mongoDB connection
mongoose
  .connect("mongodb://localhost/vidly", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected Kp..!"))
  .catch(() => console.log("Something Went wrong, not connected..!"));

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  }
});

const Model = mongoose.model("vidlygenres", Schema);

exports.GenreSchema = Schema;
exports.GenreModel = Model;
