var _ = require('lodash');
require('dotenv').load()

var localEnvVars = {
  TITLE:      'fluffmates_api',
  SAFE_TITLE: 'fluffmates_api'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
