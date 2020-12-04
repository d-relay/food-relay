import Router from '@koa/router'
import { UserServices } from '../services'
import { User } from '../entities'
import { rollbar } from '../config/rollbar'
const router = new Router()

router.post('/login', async (ctx, next) => {
	const { id: client_id, login, email, accessToken } = (<any>ctx.request).body
	rollbar.info(`client_id: "${client_id}". login: "${login}". email: "${email}". accessToken: "${accessToken}"`);

	const userServises = new UserServices()
	const user: User = await userServises.FindByCliendId({ client_id })

	if (!user) {
		const user: User = await userServises.UserRegistration({ client_id, login, email })
		ctx.status = 200
		ctx.body = {
			_id: user.client_id,
			token: userServises.getToken(user)
		}
	} else {
		await userServises.UserTokenValidation({ client_id, accessToken })

		ctx.status = 200
		ctx.body = {
			_id: user.client_id,
			token: userServises.getToken(user)
		}
	}
})

export default router
