const { executeGQL } = require('./GQL');

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

module.exports = { getAllSurveys }
