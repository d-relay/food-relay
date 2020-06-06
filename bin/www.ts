#!/usr/bin/env node

import app from '../app';
import debug from 'debug';
import http from 'http';

debug('relay:server');

const port: number = normalizePort(process?.env?.PORT);
// app.set('port', port);

/**
 * Create HTTP server.
 */

// const server = http2.createServer({
//   key: fs.readFileSync('localhost-privkey.pem'),
//   cert: fs.readFileSync('localhost-cert.pem')
// }, app);

var server = http.createServer(app.callback());

server.listen(port, () => console.log('listen ' + port));
server.on('error', onError);
server.on('listening', onListening);


function normalizePort(val: string | undefined) {
  if (!val) return 5000;
  const port = parseInt(val, 10);

  if (port >= 0) {
    return port;
  }

  return 5000;
}

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr?.port;
  debug('Listening on ' + bind);
}