import { Alert } from '../entities/Alert.entity'
import { getRepository } from 'typeorm';
import { Image } from '../entities/Image.entity';

export class ImageServices {
    private imageRepository = getRepository(Image);

    create({ filename }: { filename: string }): Promise<Image> {
        const image = this.imageRepository.create({ filename });
        return this.imageRepository.save(image);
    }

    // async UpdateFields({ user, params }: { user: User, params: any }): Promise<Alert> {
    //     await this.imageRepository.update({ user }, { ...params });
    //     return this.imageRepository.findOne({ where: { user } });
    // }
}