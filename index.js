const cors = require("cors");
const bodyParser = require('body-parser');

require("dotenv/config");

// process env
const { DB_CONNECTION } = process.env;
const PROJECT_NAME = 'compass-coding-test';
const adapterConfig = { mongoUri: DB_CONNECTION };

const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const initialiseData = require('./initData');
const { setKeystone } = require('./controllers/GQL');

// Lists
const QuestionSchema = require('./lists/QuestionSchema.js');
const SurveySchema = require('./lists/SurveySchema.js');
const OptionSchema = require('./lists/OptionSchema.js');

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(adapterConfig),
  onConnect: initialiseData, 
  cookie: {
    secure: false, // this needs to be false for local testing
    sameSite: 'None'
  },
  cookieSecret: 'very_secret',
});

// --- Keystone start setup -----
keystone.createList('Survey', SurveySchema);
keystone.createList('Question', QuestionSchema);
keystone.createList('Option', OptionSchema);

setKeystone(keystone);
// --- Keystone end setup -----


const configureServer = (app) => {
  app.use(bodyParser.json({limit: '50mb'}));

  app.use(cors());

  // Region start - Routing for surveys
  const surveys = require('./routes/surveyRoutes.js');
  app.use('/surveys', surveys);
  // Region end - Routing for surveys
};

module.exports = {
  configureExpress: app => {configureServer(app)},
  keystone,
  apps: [
    new GraphQLApp(), 
    new AdminUIApp({ 
      name: PROJECT_NAME, 
      adminPath: '/admin',
    })
  ],
};
