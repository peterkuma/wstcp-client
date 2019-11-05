#!/usr/bin/env node

'use strict'

const _ = require('lodash');
const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const through = require('through2');

const connect = require('./client.js');

const defaultConfig = {
  retry: true,
  retryInterval: 10000
};

const configFile = argv._[0] ||
  require('path').resolve(__dirname, 'config.json');

let config;
try {
  config = _.defaults(JSON.parse(fs.readFileSync(configFile)), defaultConfig);
} catch (err) {
  console.error('Cannot read config file: ' + err.message);
  process.exit(1);
}

const consoleStream = (new PrettyStream())
consoleStream.pipe(process.stderr);

global.log = bunyan.createLogger({
  name: 'wstcp-client',
  level: 'info',
  type: 'raw',
  stream: consoleStream
});

if (config.log) {
  global.log = bunyan.createLogger({
    name: 'wstcp-client',
    streams: [
      {
        level: 'info',
        type: 'raw',
        stream: consoleStream
      },
      {
        level: 'info',
        path: require('path').resolve(
          require('path').dirname(configFile),
          config.log
        )
      },
      {
        level: 'info',
        type: 'raw',
        stream: through.obj(rec => {
          if (process.send) {
            process.send({
              name: ({
                60: 'fatal',
                50: 'error',
                40: 'warn',
                30: 'info',
                20: 'debug',
                10: 'trace'
              }[rec.level]),
              data: rec.err || rec.msg
            });
          }
        })
      }
    ]
  });
}

process.on('uncaughtException', err => {
  log.error(err, 'Uncought exception: ' + err.message);
});

(function retry() {
  let last = new Date();
  let client = connect(config);
  if (config.retry) {
    client.on('close', () => {
      setTimeout(retry, config.retryInterval - (new Date() - last));
    });
  }
})();
