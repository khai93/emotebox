const expressLoader = require('./express');

module.exports.init = async (expressApp) => {
  await expressLoader(expressApp);
  console.log('Express Initialized');
}