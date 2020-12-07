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
	picture: string;
	email_verified: boolean;
}

router.post('/login', async (ctx, next) => {
	const body = (<any>ctx.request).body
	const { email, display_name, provider, provider_id, access_token, email_verified, picture } = getLoginData(body);
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

function getLoginData(body: any): LoginData {
	const loginData = {
		display_name: body.displayName,
		access_token: body.accessToken,
		provider_id: body.id,
	} as LoginData;

	if (body.provider === ProviderType.TWITCH) {
		loginData.email = body.email;
		loginData.email_verified = !!body.email;
		loginData.provider = ProviderType.TWITCH
		loginData.picture = body.profile_image_url
	} else if (body.provider === ProviderType.GOOGLE) {
		loginData.email = body.emails[0].value;
		loginData.email_verified = body.email_verified;
		loginData.provider = ProviderType.GOOGLE
		loginData.picture = body.picture;
	}

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