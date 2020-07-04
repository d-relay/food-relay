import fetch, { Headers } from 'node-fetch';
import { getRepository } from "typeorm";
import { User } from '../entities/User.entity';
import { LocationServices } from './LocationServices';

export class UserServices {
    private userRepository = getRepository(User);

    async FindByCliendId({ client_id }): Promise<User> {
        const user = await this.userRepository.findOne({ where: { client_id } });

        return user;
    }

    async UserRegistration({ client_id, login, email }): Promise<User> {
        const location = await new LocationServices().createEmptyLocation();
        const user = this.userRepository.create({ client_id, login, email, location });
        return this.userRepository.save(user);
    }

    async UserTokenValidation({ client_id, accessToken }): Promise<Boolean | Error> {
        const headers = new Headers({
            "Authorization": "OAuth " + accessToken,
            'Content-Type': 'application/json'
        })
        const reps = await fetch('https://id.twitch.tv/oauth2/validate', { method: "GET", headers });
        const json = await reps.json();

        return json.user_id === client_id ? true : new Error('Forbitten');
    }
}