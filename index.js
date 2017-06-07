'use strict';
const channels = require('./routes/channels');
const videos = require('./routes/videos');

exports.channels = (request, response) => {
  //set JSON content type and CORS headers for the response
  response.header('Content-Type','application/json');
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  channels(request, response);
};

exports.videos = (request, response) => {
  //set JSON content type and CORS headers for the response
  response.header('Content-Type','application/json');
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  videos(request, response);
};

exports.event = (event, callback) => {
  callback();
};
