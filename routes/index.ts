import alert from './Alert'
import auth from './Auth'
import location from './Location'
import profile from './Profile'
import partner from './Partner'

export const controller = (app: any) => {
	app.use(auth.routes())
	app.use(auth.allowedMethods())

	app.use(alert.routes())
	app.use(alert.allowedMethods())

	app.use(profile.routes())
	app.use(profile.allowedMethods())

	app.use(location.routes())
	app.use(location.allowedMethods())

	app.use(partner.routes())
	app.use(partner.allowedMethods())
}
