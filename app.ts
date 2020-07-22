import { config as loadENV } from 'dotenv';
loadENV({ path: '.env' })
import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-body';
import morgan from 'koa-morgan';
import passport from 'koa-passport';
import session from 'koa-session';
import { createStream } from 'rotating-file-stream';
import './config/db';
import './handlers/passport';
import { controller } from './routes';

import debug from 'debug';
import http from 'http';
import { Server } from 'ws';
import url from 'url';

const app = new Koa();

function generator(this: { filename: string }, time: number | Date): string {
    if (!time) return "logs/" + this.filename;
    const date = new Date(time).toLocaleDateString();
    return `logs/${date}/${date}-${this.filename}`;
};

const accessLogStream = createStream(generator.bind({ filename: "accessLogStream.log" }), { size: "10M", interval: "1M" });
const errorBackendLogStream = createStream(generator.bind({ filename: "errorBackendLogStream.log" }), { size: "10M", interval: "1M" });

app.use(bodyParser());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(cors({ credentials: true }));

app.keys = [process.env.COOKIE_SECRET];
app.use(session({ key: process.env.SESSION_SECRET }, app));
app.use(passport.initialize());
app.use(passport.session());

app.use(async (ctx, next) => {
    ctx.wss = wss;
    return next();
});


app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message
        };
        ctx.app.emit('error', err, ctx);
    }
});

controller(app);

app.on('error', (err: Error, ctx: Koa.ParameterizedContext) => {
    const ip = ctx.ip;
    const url = ctx.protocol + '://' + ctx.host + ctx.originalUrl;
    const client = ctx.headers['user-agent'];
    const date = new Date().toISOString();
    const errorMessage = `[${date}] - [${ip}] [${url}] [${client}] ${err.stack}\n`;
    errorBackendLogStream.write(errorMessage);
});

const port: number = +process?.env?.PORT || 5000;
const server = http.createServer(app.callback());
const wss = new Server({ server });

server.listen(port, () => debug('listen ' + port));
server.on('error', (error: any) => {
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
});

server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr?.port;
    debug('Listening on ' + bind);
});

wss.on('connection', (ws, req) => {
    const token = url.parse(req.url, true);
    if (token) {
        (<any>ws).id = token.href.substring(1);
        ws.on('close', () => debug('Client disconnected'));
    }
    return;
});