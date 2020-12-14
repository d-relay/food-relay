import Router from '@koa/router'
import { User } from '../entities'
import { Provider } from '../entities/Provider'
import { ProviderServices } from '../services'
import { ForbittenError } from '../errors'
import { UserServices, getLoginData } from '../services/UserServices'

const router = new Router();

router.post('/login', async (ctx, next) => {
	const body = (<any>ctx.request).body
	const {
		email, display_name, provider,
		provider_id, access_token, email_verified, picture
	} = getLoginData(body);
	if (!email_verified) {
		throw new ForbittenError('email not verified')
	}

	const userServises = new UserServices()
	const providerServises = new ProviderServices();

	let _provider: Provider;
	let user: User = await userServises.findByEmail({ email });

	if (!user) {
		const user: User = await userServises.save({ email });
		_provider = await providerServises.save({
			provider_id, provider, user, display_name
		});
	} else {
		_provider = await providerServises.findOne(user, provider);
		if (!_provider) {
			_provider = await providerServises.save({ provider_id, provider, display_name, user });
		}

		await providerServises.tokenValidate({ provider: _provider, access_token })
	}

	ctx.status = 200
	ctx.body = {
		email,
		picture,
		display_name,
		_id: _provider.provider_id,
		token: providerServises.getToken(_provider)
	}
})

export default router