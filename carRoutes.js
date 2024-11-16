const express = require('express');
const { createCar, getAllCars, getCarById, updateCar, deleteCar } = require('../controllers/carControllers');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/', authMiddleware, upload.array('images', 10), createCar);
router.get('/', authMiddleware, getAllCars);
router.get('/:id', authMiddleware, getCarById);
router.put('/:id', authMiddleware, upload.array('images', 10), updateCar);
router.delete('/:id', authMiddleware, deleteCar);

module.exports = router;
