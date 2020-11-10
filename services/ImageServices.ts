import { getRepository } from 'typeorm'

// import { Alert } from '../entities/Alert'
import { Image } from '../entities/Image'

export class ImageServices {
	private imageRepository = getRepository(Image);

	create ({ filename }: { filename: string }): Promise<Image> {
		const image = this.imageRepository.create({ filename })
		return this.imageRepository.save(image)
	}

	// async UpdateFields({ user, params }: { user: User, params: any }): Promise<Alert> {
	//     await this.imageRepository.update({ user }, { ...params });
	//     return this.imageRepository.findOne({ where: { user } });
	// }
}
