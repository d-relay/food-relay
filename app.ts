/* eslint-disable import/first */
import { config as loadENV } from 'dotenv'
import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-body'
import morgan from 'koa-morgan'
import passport from 'koa-passport'
import session from 'koa-session'
loadENV()
import { accessLogStream, errorBackendLogStream } from './config/logger'
import { createSocketConnetion } from './config/socket-map'
import { rollbar } from './config/rollbar'
import './config/db'
import './handlers/passport'
import { controller } from './routes'

import debug from 'debug'
import http from 'http'

const app = new Koa()

app.use(bodyParser())
app.use(morgan('combined', { stream: accessLogStream }))
app.use(cors({ credentials: true }))

app.keys = [process.env.COOKIE_SECRET]
app.use(session({ key: process.env.SESSION_SECRET }, app as any))
app.use(passport.initialize())
app.use(passport.session())

app.use(async (ctx, next) => {
	try {
		await next()
	} catch (err) {
		ctx.status = err.statusCode || err.status || 500
		ctx.body = {
			message: err.message
		}
		rollbar.error(err, ctx.request);
		ctx.app.emit('error', err, ctx)
	}
})

controller(app)

app.on('error', (err: Error, ctx: Koa.ParameterizedContext) => {
	const ip = ctx.ip
	const url = ctx.protocol + '://' + ctx.host + ctx.originalUrl
	const client = ctx.headers['user-agent']
	const date = new Date().toISOString()
	const errorMessage = `[${date}] - [${ip}] [${url}] [${client}] ${err.stack}\n`
	errorBackendLogStream.write(errorMessage)
})

const port: number = +process?.env?.PORT || 5000
const server = http.createServer(app.callback())
createSocketConnetion(server)

server.listen(port, () => debug('listen ' + port))
server.on('error', (error: any) => {
	if (error.syscall !== 'listen') {
		throw error
	}

	const bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port

	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges')
			process.exit(1)
		case 'EADDRINUSE':
			console.error(bind + ' is already in use')
			process.exit(1)
		default:
			throw error
	}
})

server.on('listening', () => {
	const addr = server.address()
	const bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr?.port
	debug('Listening on ' + bind)
})
