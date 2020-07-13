import { Alert } from '../entities/Alert.entity'
import { getRepository } from 'typeorm';

export class AlertServices {
    private alertRepository = getRepository(Alert);


    FindByUser({ user }): Promise<Alert> {
        return this.alertRepository.findOne({ where: { user } });
    }
}