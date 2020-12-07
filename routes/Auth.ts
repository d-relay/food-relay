import Router from '@koa/router'
import { User } from '../entities'
import { Provider, ProviderType } from '../entities/Provider'
import { UserServices, ProviderServices } from '../services'
import { ForbittenError } from '../errors'
const router = new Router();

interface LoginData {
	provider: ProviderType;
	email: string;
	provider_id: string;
	display_name: string;
	access_token: string;
	email_verified: boolean;
}

router.post('/login', async (ctx, next) => {
	const body = (<any>ctx.request).body
	const { email, display_name, provider, provider_id, access_token, email_verified } = getLoginData(body);
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
		_id: _provider.provider_id,
		token: providerServises.getToken(_provider)
	}
})

function getLoginData(body: any): LoginData {
	const loginData = {} as LoginData;

	if (body.provider === ProviderType.TWITCH) {
		loginData.display_name = body.login;
		loginData.email_verified = !!body.email;
	} else if (body.provider === ProviderType.GOOGLE) {
		loginData.display_name = body.displayName;
		loginData.email_verified = body.email_verified;
	}

	loginData.provider = ProviderType[body.provider];
	loginData.access_token = body.accessToken;
	loginData.provider_id = body.id;
	loginData.email = body.email;
	return loginData;
}


export default router


// provider: 'google',
// id: '103933889103011288106',
// displayName: 'Андрій Тимченко',
// email_verified: true,
// verified: true,
// language: 'uk',
// email: 'andrijmessia@gmail.com',
// picture: 'https://lh3.googleusercontent.com/a-/AOh14Gjhs7Z13jYjR_i5CYSnvpw29_QM4u-Zr0m7IqG4Pg=s96-c',
// emails: [ { value: 'andrijmessia@gmail.com', type: 'account' } ],