import { Alert } from '../entities/Alert.entity'
import { getRepository } from 'typeorm';
import { User } from '../entities/User.entity';

export class AlertServices {
    private alertRepository = getRepository(Alert);


    FindByUser({ user }: { user: User }): Promise<Alert> {
        return this.alertRepository.findOne({ where: { user } });
    }

    async UpdateFields({ user, params }: { user: User, params: any }): Promise<Alert> {
        await this.alertRepository.update({ user }, { ...params });
        return this.alertRepository.findOne({ where: { user } });
    }
}