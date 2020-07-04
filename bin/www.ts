import app from '../app';
import debug from 'debug';
import http2 from 'http2';

debug('relay:server');

const port: number = normalizePort(process?.env?.PORT);


const serverHttp2 = http2.createServer(app.callback());
serverHttp2.listen(port, () => console.log('listen ' + port));
serverHttp2.on('error', onError);
serverHttp2.on('listening', onListening2);

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

function onListening2() {
  const addr = serverHttp2.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr?.port;
  debug('Listening on ' + bind);
}