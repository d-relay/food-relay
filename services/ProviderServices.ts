import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import fetch, { Headers, Response } from 'node-fetch'

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
        let reps: Response;

        if (provider.provider === ProviderType.GOOGLE) {
            const query = '?id_token=' + access_token;
            reps = await fetch('https://oauth2.googleapis.com/tokeninfo' + query, { method: 'GET', })
        } else {
            const headers = new Headers({
                Authorization: 'OAuth ' + access_token,
                'Content-Type': 'application/json'
            })
            reps = await fetch('https://id.twitch.tv/oauth2/validate', { method: 'GET', headers })
        }

        const json = await reps.json()
        if (json.id !== provider.provider_id)
            throw new ForbittenError('access_token not valid')
    }

    getToken(provider: Provider): string {
        return jwt.sign({
            provider: provider.provider,
            provider_id: provider.provider_id,
        }, String(process.env.COOKIE_SECRET), { expiresIn: 60 * 60 })
    }
}
