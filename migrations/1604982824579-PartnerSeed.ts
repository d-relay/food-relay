import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'
import { Partner } from '../entities/Partner'
import { Image } from '../entities/Image'

export class PartnerSeed1604981125471 implements MigrationInterface {
    private partnerRepository = getRepository(Partner);
    private imageRepository = getRepository(Image);

    public async up (queryRunner: QueryRunner): Promise<void> {
    	const partners = [
    		{ name: 'cherepakha', logo: 'v1604981533/cherep.png' },
    		{ name: 'plezentvil', logo: 'v1604981533/ples.png' },
    		{ name: 'barbaris', logo: 'v1604981533/barb.png' },
    		{ name: 'mimicon', logo: 'v1604981533/mimi.png' },
    		{ name: 'mandri', logo: 'v1604981533/mandry.png' },
    		{ name: 'mario', logo: 'v1604981533/mario.png' }
    	]

    	for await (const partner of partners) {
    		const image = await this.imageRepository.save({ filename: partner.logo })
    		await this.partnerRepository.save({ min_limit: 400, name: partner.name, logo: image })
    	}
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
    	queryRunner.query('TRUNCATE Partner')
    }
}
