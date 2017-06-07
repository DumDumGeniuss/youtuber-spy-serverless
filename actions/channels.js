const config = require('../config');
const mongoose = require('mongoose');
const ChannelModel = require('../models/Channel');

mongoose.Promise = global.Promise;

exports.getConnection = function () {
  return new Promise ((resolve, reject) => {
    const db = mongoose.connect(config.mongodb_url).connection;
    db.on('connected', function() {
      resolve(db);
    });
  });
};

exports.getChannels = function () {
  return ChannelModel.find({})
    .then((channels) => {
      return channels;
    });
};
