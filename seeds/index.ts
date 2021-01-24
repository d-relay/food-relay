import { config } from 'dotenv'
import path from 'path'

import { createConnection, getRepository } from 'typeorm'
import { Partner, Image } from '../entities'
config()

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
			{ name: 'cherepakha', 	filename: 'cherep.png' 		},
			{ name: 'plezentvil', 	filename: 'ples.png' 		},
			{ name: 'barbaris', 	filename: 'barb.png' 		},
			{ name: 'mimicon', 		filename: 'mimi.png' 		},
			{ name: 'mandri', 		filename: 'mandry.png' 		},
			{ name: 'mario', 		filename: 'mario.png' 		},
			{ name: 'hz-food', 		filename: 'hz-food.webp' 	}
		]

		for await (const { name, filename } of partners) {
			const { id } = await partnerRepository.save({
				min_limit: 400, name: name
			})

			await imageRepository.save({
				filename: filename, imageableId: id, imageableType: 'partner'
			})
		}
		process.exit(0)
	})
})
