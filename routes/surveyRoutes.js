const express = require('express');
const router = express.Router();

// Controller
const { getAllSurveys, getSurveyById } = require('./../controllers/surveyController');

router.get('/', getAllSurveys);
router.get('/:survey_id', getSurveyById);

module.exports = router;