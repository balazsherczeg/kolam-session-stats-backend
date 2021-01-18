require('dotenv').config();
const http = require('http');
const getIp = require('ipware')().get_ip;

const logError = require('./logError').log;
const logSession = require('./logSession').logSession;
const logShare = require('./logShare').logShare;

const log = (data, ip) => {
  const {key} = data;

  switch (key) {
    case 'CRASH':
    case 'ERROR':
      logError(data);
      break;
    case 'SESSION':
      logSession(data, ip);
      break;
    case 'SHARE':
      logShare(data, ip);
      break;
    default:
      response.end();
  }
};

http.createServer((request, response) => {
  const {clientIp: ip} = getIp(request);

  if (request.method == 'POST') {
    var body = '';
    request.on('data', (data) => {
      body += data;
    });
    request.on('end', () => {
      log(JSON.parse(body), ip);
      response.end();
    });
  } else {
    response.end();
  }
}).listen(8080);
