const config = require('../config');
const mongoose = require('mongoose');
const VideoModel = require('../models/Video');

mongoose.Promise = global.Promise;

getConnection = function () {
  return new Promise ((resolve, reject) => {
    const db = mongoose.connect(config.mongodb_url).connection;
    db.on('connected', function() {
      resolve(db);
    });
  });
};

exports.getVideos = function (request, response) {
  let sort = request.query.sort || 'publishedAt';
  let page = parseInt(request.query.page || 1, 10);
  let count = parseInt(request.query.count || 30, 10);
  let startTime = request.query.startTime || '1970-01-01';
  let endTime = request.query.endTime || '2100-12-31';

  console.log(startTime, endTime);
  const dbQuery = {
    title: { $exists: true },
    publishedAt: {
      '$gte': new Date(startTime),
      '$lte':  new Date(endTime)
    }
  };

  let dbConnection;
  let videos = [];
  let totalCounts = []
  getConnection()
    .then((connection) => {
      dbConnection = connection;
      return VideoModel.find(dbQuery).sort({ [sort]: 'desc' }).skip((page - 1)*count).limit(count);
    })
    .then((videos) => {
      response.status(200).json(videos);
      dbConnection.close();
    });
};

