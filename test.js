const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/practise2", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected Kp..!"))
  .catch(() => console.log("Something Went wrong, not connected..!"));

const schema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function(data, callBack) {
        setTimeout(() => {
          const result = data && data.length > 0;
          callBack(result);
        }, 4000);
      },
      message: "Tag must contain atleast one element"
    }
  },
  date: Date,
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
    min: 10,
    max: 100
  }
});

const Course = mongoose.model("courses", schema);

const createCourse = async () => {
  const course = new Course({
    name: "Pavan",
    category: "web",
    author: "String",
    tags: ["web"],
    isPublished: true,
    price: 11
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
};

createCourse();
