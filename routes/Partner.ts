import Router from '@koa/router'
// import passport from 'koa-passport'
// import { User } from '../entities'
import { PartnerServices } from '../services'
const router = new Router()

router.get('/partners',
// passport.authenticate('jwt', { session: false }),
	async (ctx: any) => {
	// const user: User = ctx.state.user

		const partnerServices = new PartnerServices()
		const partners = await partnerServices.loadPartners()

		ctx.status = 200
		ctx.body = partners
	})

export default router
