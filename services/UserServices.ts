import { getRepository } from 'typeorm'
import { User } from '../entities/User'
import { ProviderType } from '../entities/Provider'

export class UserServices {
	constructor(private userRepository = getRepository(User)) { }

	async findByEmail({ email }): Promise<User> {
		return this.userRepository.findOne({ where: { email } });
	}

	async save({ email }): Promise<User> {
		return this.userRepository.save({ email })
	}
}

export interface LoginData {
	provider: ProviderType;
	email: string;
	provider_id: string;
	display_name: string;
	access_token: string;
	picture: string;
	email_verified: boolean;
}

export function getLoginData(body: any): LoginData {
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