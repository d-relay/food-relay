import passport from 'koa-passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { getManager } from 'typeorm'
import { Provider } from '../entities'

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.COOKIE_SECRET
}

passport.use(new JwtStrategy(options, async (jwtPayload: any, done: Function) => {
	try {
		const entityManager = getManager();

		const provider = await entityManager.findOne(Provider, {
			where: {
				provider: jwtPayload.provider,
				provider_id: jwtPayload.provider_id,
			},
			relations: ['user'],
		})

		return done(null, provider?.user ?? false)
	} catch (err) {
		return done(err, false)
	}
}))
