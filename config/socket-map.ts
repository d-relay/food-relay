import http from 'http'
import debug from 'debug'
import { Server } from 'ws'
import { rollbar } from './rollbar'

export let socketServer: Server

export function createSocketConnetion (server: http.Server) {
	socketServer = new Server({ server })

	socketServer.on('connection', (socket: any, req) => {
		try {
			const token = req.url.split('/')[1]
			if (token) {
				socket._token = token
				socket.on('close', () => {
					debug('Client disconnected')
				})
			}
		} catch (error) {
			rollbar.error(error)
		}
	})
}
