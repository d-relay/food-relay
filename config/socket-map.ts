import url from 'url'
import http from 'http'
import debug from 'debug'
import { Server } from 'ws'

export let socketServer: Server

export function createSocketConnetion(server: http.Server) {
	socketServer = new Server({ server })

	socketServer.on('connection', (socket, req) => {
		try {
			const token = new url.URL(req.url).href.substring(1)
			type Socket = typeof socket & { _token: string };
			if (token) {
				(socket as Socket)._token = token
				socket.on('close', () => {
					debug('Client disconnected')
				})
			}
		} catch (error) {

		}
	})
}
