const config = require('../config');
const mongoose = require('mongoose');
const ChannelModel = require('../models/Channel');

mongoose.Promise = global.Promise;

getConnection = function () {
  return new Promise ((resolve, reject) => {
    const db = mongoose.connect(config.mongodb_url).connection;
    db.on('connected', function() {
      resolve(db);
    });
  });
};

exports.getChannels = function (request, response) {
  let sort = request.query.sort || 'subscriberCount';
  let order = request.query.order || 'desc';
  let page = parseInt(request.query.page || 1, 10);
  let count = parseInt(request.query.count || 100, 10);
  let dbConnection;
  getConnection()
    .then((connection) => {
      dbConnection = connection;
      return ChannelModel.find({title: { $exists: true } }).sort({ [sort]: order }).skip((page - 1)*count).limit(count);;
    })
    .then((channels) => {
      response.status(200).json(channels);
      dbConnection.close();
    });
};

exports.saveChannel = function (request, response) {
  const channel = request.body;
  if (!channel._id) {
    response.status(500).send('New channel must have _id parameters');
    return;
  }

  let dbConnection;

  getConnection()
    .then((connection) => {
      dbConnection = connection;
      const newChannel = new ChannelModel(channel);
      return newChannel.save();
    })
    .then(() => {
      response.status(200).send('successfully create channel');
      dbConnection.close();
    })
    .catch((err) => {
      response.status(500).send(err);
    });
};

