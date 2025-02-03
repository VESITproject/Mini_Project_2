const express = require('express');
const {handlePrediction} = require('../controllers/predictionController')
const router = express.Router();

router.get('/', handlePrediction);

module.exports = router;

