import { config as loadENV } from 'dotenv';
loadENV({ path: '.env' })
import Koa from 'koa';
import cors from '@koa/cors';
import session from 'koa-session'
import morgan from 'koa-morgan';
import bodyParser from 'koa-body';
import passport from 'koa-passport';
import { controller } from './routes';
import { createStream } from 'rotating-file-stream';
import { getManager, } from "typeorm";
import './config/db';
import './handlers/passport';

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

app.use(async function (ctx, next) {
    ctx.state.connection = getManager();
    await next();
})

controller(app);

app.on('error', (err: Error, ctx: Koa.ParameterizedContext) => {
    const ip = ctx.ip;
    const url = ctx.protocol + '://' + ctx.host + ctx.originalUrl;
    const client = ctx.headers['user-agent'];
    const date = new Date().toISOString();
    const errorMessage = `[${date}] - [${ip}] [${url}] [${client}] ${err.stack}\n`;
    errorBackendLogStream.write(errorMessage);
});

export default app;