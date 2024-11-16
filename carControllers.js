const Car = require('../models/carModels');

exports.createCar = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const images = req.files.map(file => file.path);
    const car = new Car({ title, description, tags, images, userId: req.user.id });
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({ userId: req.user.id });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const images = req.files ? req.files.map(file => file.path) : undefined;
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { title, description, tags, ...(images && { images }) },
      { new: true }
    );
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
