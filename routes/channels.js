const channelAction = require('../actions/channels');
const libs = require('../libs/routerHelper');

module.exports = function (request, response) {
  const restfulInfo = libs.restfulRecognition(request.path, request.method);

  switch (restfulInfo.action) {
    case 'query':
      channelAction.getChannels(request, response);
      break;
    case 'get':
      response.status(200).send('get');
      break;
    case 'create':
      channelAction.saveChannel(request, response);
      break;
    case 'update':
      response.status(200).send('update');
      break;
    case 'delete':
      response.status(200).send('delete');
      break;
    default:
      response.status(200).send('no match');
  }
};