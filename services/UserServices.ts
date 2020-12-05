import fetch, { Headers } from 'node-fetch'
import { getRepository } from 'typeorm'
import { Alert, Location, User } from '../entities'
import jwt from 'jsonwebtoken'

export class UserServices {
    private userRepository = getRepository(User);

    async FindByCliendId ({ client_id }): Promise<User> {
    	const user = await this.userRepository.findOne({ where: { client_id } })

    	return user
    }

    async UserRegistration ({ client_id, login, email }): Promise<User> {
    	const user: User = await this.userRepository.save({ client_id, login, email })
    	await getRepository(Location).save({ user })
    	await getRepository(Alert).save({ user })

    	return user
    }

    async UserTokenValidation ({ client_id, accessToken }): Promise<Boolean | Error> {
    	const headers = new Headers({
    		Authorization: 'OAuth ' + accessToken,
    		'Content-Type': 'application/json'
    	})
    	const reps = await fetch('https://id.twitch.tv/oauth2/validate', { method: 'GET', headers })
    	const json = await reps.json()

    	return json.user_id === client_id ? true : new Error('Forbitten')
    }

    getToken (user: User): string {
    	return jwt.sign({ id: user.client_id }, String(process.env.COOKIE_SECRET), { expiresIn: 60 * 60 })
    }
}
