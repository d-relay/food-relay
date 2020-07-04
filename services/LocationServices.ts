import { EntityManager, getRepository } from "typeorm";
import { Location } from '../entities/Location.entity'
export class LocationServices {

    async createEmptyLocation(): Promise<Location> {
        const locationRepository = getRepository(Location);
        const location = locationRepository.create();
        return locationRepository.save(location);
    }
}