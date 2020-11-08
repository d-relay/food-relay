import { Alert } from '../entities/Alert.entity'
import { getRepository } from 'typeorm';
import { User } from '../entities/User.entity';

export class AlertServices {
    private alertRepository = getRepository(Alert);

    async FindByUser({ user }: { user: User }): Promise<Alert> {
        return this.alertRepository.findOne({ where: { user } });
    }

    async FindByToken({ alert_token }: { alert_token: string }): Promise<Alert> {
        return this.alertRepository.findOne({ where: { alert_token } })
    }

    async UpdateFields({ user, params }: { user: User, params: Alert }): Promise<Alert> {      
        await this.alertRepository.update({ user }, { ...params });
        return this.alertRepository.findOne({ where: { user } });
    }
}