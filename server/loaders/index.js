const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');
const S3Loader = require('./s3');
const discordLoader = require('./discord');

module.exports.init = async (expressApp) => {
  await S3Loader();
  console.log("S3 Initialized");

  await mongooseLoader();
  console.log("Mongoose connected");

  await expressLoader(expressApp);
  console.log('Express Initialized');

  await discordLoader();
  console.log('Discord Initialized');
}