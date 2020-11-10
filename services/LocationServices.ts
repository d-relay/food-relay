import { getRepository } from 'typeorm'
import { Location } from '../entities/Location'
export class LocationServices {
    private locationRepository = getRepository(Location);

    async FindByUser ({ user }): Promise<Location> {
    	return this.locationRepository.findOne({ where: { user } })
    }

    async UpdateFields ({ user, params }): Promise<Location> {
    	await this.locationRepository.update({ user }, { ...params })
    	return this.locationRepository.findOne({ where: { user } })
    }
}
