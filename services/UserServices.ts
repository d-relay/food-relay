import fetch, { Headers } from 'node-fetch';
import { getRepository } from "typeorm";
import { User } from '../entities/User.entity';
import { LocationServices } from './LocationServices';

export class UserServices {

    async FindByCliendId({ client_id }): Promise<User> {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { client_id } });

        return user;
    }

    async UserRegistration({ client_id, login, email }): Promise<User> {
        const locationServices = new LocationServices();
        const location = await locationServices.createEmptyLocation();

        const userRepository = getRepository(User)
        const user = userRepository.create({ client_id, login, email, location });
        return userRepository.save(user);
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