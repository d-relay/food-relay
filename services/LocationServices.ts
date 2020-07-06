import { EntityManager, getRepository } from "typeorm";
import { Location } from '../entities/Location.entity'
export class LocationServices {

    private locationRepository = getRepository(Location);

    async createEmptyLocation(): Promise<Location> {
        const location = this.locationRepository.create();
        return this.locationRepository.save(location);
    }

    async FindLocationById({ id }): Promise<Location> {
        return this.locationRepository.findOne({ where: { id } });
    }

    async UpdateFields({ id, params }): Promise<Location> {
        await this.locationRepository.update({ id }, { ...params });
        return this.locationRepository.findOne({ where: { id } });
    }
}