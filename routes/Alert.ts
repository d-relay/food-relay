import Router from '@koa/router'
import passport from 'koa-passport'
import { User } from '../entities'
import { AlertServices } from '../services'
import { socketServer } from '../config/socket-map'
const router = new Router()

router.get('/alert', passport.authenticate('jwt', { session: false }), async (ctx) => {
	const user: User = ctx.state.user

	const alertServices = new AlertServices()
	const alert = await alertServices.FindByUser({ user })

	ctx.status = 200
	ctx.body = alert
})

router.get('/alert/personal', async (ctx) => {
	const alert_token = '' + ctx.query.alert_token

	const alertServices = new AlertServices()
	const alert = await alertServices.FindByToken({ alert_token })
	ctx.status = 200
	ctx.body = alert
})

router.post('/alert', passport.authenticate('jwt', { session: false }), async (ctx) => {
	const user: User = ctx.state.user
	const params: any = (ctx.request as any).body

	const alertServices = new AlertServices()
	const alert = await alertServices.UpdateFields({ user, params })

	ctx.status = 200
	ctx.body = alert
})

router.post('/alert/test/:alertToken', passport.authenticate('jwt', { session: false }), async (ctx: any, next) => {
	const { alertToken } = ctx.params
	if (socketServer) {
		const wss = [...socketServer.clients].filter(ws => (ws as any)._token === alertToken)
		wss.map(ws => ws.send(alertToken))
	}
	ctx.status = 200
	ctx.body = { status: 'ok' }
})

export default router
