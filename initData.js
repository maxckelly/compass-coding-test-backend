const { gql } = require('apollo-server-express');
const { createItems, getItems, createItem } = require('./controllers/GQL');

let keystone;
let context;

module.exports = async (ks) => {
  keystone = ks;
  context = keystone.createContext({});

  const surveyCount = await getListCount('Survey');
  const questionCount = await getListCount('Question');
  const optionCount = await getListCount('Option');

  if (surveyCount === 0) {
    await preCreateSurveys();
  } else if (optionCount === 0) {
    await preCreateOptions();
  } else if (questionCount === 0) {
    await preCreateQuestions();
  }
};

// --- Create Surveys Start ---
const preCreateSurveys = async () => {
  await createSurveys('Survey One', 1);
  await createSurveys('Survey Two', 2);
  await createSurveys('Survey Three', 3);
  console.log('Pre created survey');
};

// Creates surveys
const createSurveys = async (name, displayOrder) => {
  const item = {name, displayOrder};
  await createItem('Survey', item, 'id');
};
// --- Create Surveys End ---

// --- Create Questions Start ---
const preCreateQuestions = async () => {
  await createQuestions(
    'Maryam O\'Ryan', 
    'How many devs does it take ot change a lightbulb',
    'This is not a trick question',
    1
  );

  await createQuestions(
    'Elisabeth Winters', 
    'How many astronauts landed on the moon?',
    '',
    2
  );

  await createQuestions(
    'Alex smith', 
    'How many planets in our solar system?',
    ':)',
    2
  );

  console.log('Pre created questions');
};

const createQuestions = async (createdBy, title, subTitle, questionOrder) => {
  const item = {createdBy, title, subTitle, questionOrder};
  console.log(item);
  await createItem('Question', item, 'id');
};
// --- Create Questions End ---

// --- Create Options Start ---
const preCreateOptions = async () => {
  await createOptions('One', 1);
  await createOptions('Two', 2);
  await createOptions('Three', 3);

  console.log('Pre created options');
};

const createOptions = async (text, order) => {
  const item = {text, order};
  await createItem('Option', item, 'id');
};
// --- Create Options End ---

// Gets the list count from database. 
const getListCount = async (listName) => {
  const { data } = await keystone.executeGraphQL({
    context,
    query: gql` query {
      _all${listName}sMeta {
        count
      }
    }`  
  });
  return data[`_all${listName}sMeta`].count;
};