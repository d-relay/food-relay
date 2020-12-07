import { getRepository } from 'typeorm'
import { User } from '../entities/User'

export class UserServices {
	private userRepository = getRepository(User);

	async findByEmail({ email }): Promise<User> {
		return this.userRepository.findOne({ where: { email } });
	}

	async save({ email }): Promise<User> {
		return this.userRepository.save({ email })
	}
}
