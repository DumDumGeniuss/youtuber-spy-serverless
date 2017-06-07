'use strict';
const channels = require('./routes/channels');

exports.channels = (request, response) => {
  channels(request, response);
};

exports.videos = (request, response) => {
  response.status(200).send('Hello Videos!');
};

exports.event = (event, callback) => {
  callback();
};
