import Router from '@koa/router'
import passport from 'koa-passport'
import { User } from '../entities'
import { LocationServices } from '../services'
const router = new Router()

router.get('/partners', passport.authenticate('jwt', { session: false }), async (ctx: any, next) => {
	const user: User = ctx.state.user

	const locationServices = new LocationServices()
	const location = await locationServices.FindByUser({ user })

	ctx.status = 200
	ctx.body = {
		location
	}
})

export default router
