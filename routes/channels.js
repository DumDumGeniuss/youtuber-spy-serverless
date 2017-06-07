const channelAction = require('../actions/channels');

module.exports = function (request, response) {
  channelAction.getConnection()
    .then((dbConnection) => {
      return channelAction.getChannels();
    })
    .then((channels) => {
      response.status(200).json(channels);
    });
};