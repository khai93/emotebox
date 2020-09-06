const expressLoader = require('./express');
const mongooseLoader = require('./mongoose')

module.exports.init = async (expressApp) => {
  await mongooseLoader();
  console.log("Mongoose connected");

  await expressLoader(expressApp);
  console.log('Express Initialized');
}