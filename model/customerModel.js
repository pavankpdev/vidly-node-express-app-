const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

// mongoDB connection
mongoose
  .connect("mongodb://localhost/vidly", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected Kp..!"))
  .catch(() => console.log("Something Went wrong, not connected..!"));

const schema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10
  }
});

const model = mongoose.model("customers", schema);

const validateCustomer = customer => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    name: Joi.string()
      .min(10)
      .max(10)
      .required(),
    phoneNumber: Joi.boolean()
  });

  return schema.validate(customer);
};
module.exports.model = model;
module.exports.validateCustomer = validateCustomer;
