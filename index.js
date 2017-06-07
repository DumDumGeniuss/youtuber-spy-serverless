'use strict';
const channels = require('./routes/channels');
const videos = require('./routes/videos');

exports.channels = (request, response) => {
  channels(request, response);
};

exports.videos = (request, response) => {
  videos(request, response);
};

exports.event = (event, callback) => {
  callback();
};
