'use strict'

const _ = require('lodash');
const wstcpClient = require('wstcp').client;

module.exports = function(config) {
  let client = wstcpClient({
    url: _.trimEnd(config.server, '/') + '/' + config.name,
    tcpPort: config.port,
    headers: {
      'X-Key': config.key
    },
    remote: !!config.remote
  });

  client.on('connection', () => log.info('Connection established'));
  client.on('tcp-connection', () => log.info('TCP forwarding connection established'));
  client.on('close', () => log.info('Connection closed'));
  client.on('error', err => log.error(err, err.message));

  return client;
}
