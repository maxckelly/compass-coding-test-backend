const express = require('express');
const router = express.Router();

// Controller
const { getAllSurveys } = require('./../controllers/surveyController');

router.get('/', getAllSurveys);

module.exports = router;