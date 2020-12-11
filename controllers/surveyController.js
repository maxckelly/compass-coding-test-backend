const { executeGQL, getItem } = require('./GQL');

async function getAllSurveys(req, res) {
  try {
    const { allSurveys } = await executeGQL(`query {
      allSurveys (sortBy: displayOrder_ASC){ 
        id
        name
        questions {
          title
          subTitle
          questionOrder
          options {
            text
            order
          }
        }
      }
    }`);

    return res.status(200).send(allSurveys);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error
    })
  }
};

async function getSurveyById(req, res) {
  try {
      
    // Get user id
    const {survey_id} = req.params;

    // find user and return selected fields
    const survey = await getItem('Survey',
      survey_id,
      ` id
        name
        questions {
          title
          subTitle
          questionOrder
          options {
            text
            order
          }
        }`,
    );
    console.log('sending back ', survey)
    return res.status(200).send(survey);
  } catch (error) {
    console.log(error);
    return res.status(500).send({message: error})
  }
};

module.exports = { getAllSurveys, getSurveyById }
