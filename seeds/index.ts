import { config } from 'dotenv';
import path from 'path';
config();

import { createConnection, getRepository } from 'typeorm'
import { Partner, Image } from '../entities'


createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: false,
    uuidExtension: 'pgcrypto',
    entities: [
        path.join(__dirname, '../entities/**.ts')
    ]
}).then(async manager => {
    manager.transaction(async () => {

        const partnerRepository = getRepository(Partner)
        const imageRepository = getRepository(Image)

        const partners = [
            { name: 'cherepakha', filename: 'v1604981533/cherep.png' },
            { name: 'plezentvil', filename: 'v1604981533/ples.png' },
            { name: 'barbaris', filename: 'v1604981533/barb.png' },
            { name: 'mimicon', filename: 'v1604981533/mimi.png' },
            { name: 'mandri', filename: 'v1604981533/mandry.png' },
            { name: 'mario', filename: 'v1604981533/mario.png' }
        ]

        for await (const { name, filename } of partners) {
            const { id } = await partnerRepository.save({
                min_limit: 400, name: name
            })

            await imageRepository.save({
                filename: filename, imageableId: id, imageableType: 'partner'
            })
        }
        process.exit(0);
    })
});