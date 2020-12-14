import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import fetch, { Headers } from 'node-fetch'

import { Provider, ProviderType } from '../entities/Provider'
import { ForbittenError } from '../errors'
import { User } from '../entities'

export class ProviderServices {
    private providerRepository = getRepository(Provider);

    async findOne(user: User, provider: string): Promise<Provider> {
        return this.providerRepository.findOne({ where: { user, provider } });
    }

    async save(provider: Provider): Promise<Provider> {
        return this.providerRepository.save({ ...provider });
    }

    async tokenValidate({ provider, access_token }: { provider: Provider, access_token: string }): Promise<ForbittenError | void> {
        let client_id: string;

        if (provider.provider === ProviderType.GOOGLE) {
            const headers = new Headers({
                Authorization: 'Bearer ' + access_token,
            })
            const reps = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', { method: 'GET', headers })
            const json = await reps.json();
            client_id = json.sub;
        } else {
            const headers = new Headers({
                Authorization: 'OAuth ' + access_token,
                'Content-Type': 'application/json'
            })
            const reps = await fetch('https://id.twitch.tv/oauth2/validate', { method: 'GET', headers })
            const json = await reps.json();
            client_id = json.user_id;
        }

        if (client_id !== provider.provider_id)
            throw new ForbittenError('access_token not valid');
    }

    getToken(provider: Provider): string {
        return jwt.sign({
            provider: provider.provider,
            provider_id: provider.provider_id,
        }, String(process.env.COOKIE_SECRET), { expiresIn: 60 * 60 })
    }
}
