const express = require('express');
const { getAQIData } = require('../controllers/aqiController');
const router = express.Router();

router.get('/', getAQIData);

module.exports = router;
