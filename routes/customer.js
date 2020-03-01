const express = require("express");
const {  model, validateCustomer } = require("../model/customerModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const customers = await model.find();
    res.send(customers);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/", (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  try {
    const customer = new model({
      isGold: req.body.isGold,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber
    });
    customer.save();
    res.send(customer);
  } catch (error) {
    res.send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  try {
    const customer = await model.findByIdAndUpdate(
      req.params.id,
      {
        isGold: req.body.isGold,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber
      },
      { new: true }
    );
    customer.save();
    res.send(customer);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const customer = await model.findByIdAndDelete(req.params.id);
    res.send(customer);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await model.findById(req.params.id);
    res.send(customer);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
