import { config } from 'dotenv'
import { EOL } from 'os'
import { join } from 'path'

import { Direction, Flags, Format, TypeormUml } from 'typeorm-uml'
import { createConnection } from 'typeorm'
config()

createConnection({
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: false,
	logging: false,
	uuidExtension: 'pgcrypto',
	entities: [
		join(__dirname, '../entities/**.ts')
	]
}).then(async (connection) => {
	const flags: Flags = {
		direction: Direction.LR,
		format: Format.SVG,
		handwritten: true
	}

	const typeormUml = new TypeormUml()
	const url = await typeormUml.build(connection, flags)

	process.stdout.write('Diagram URL: ' + url + EOL)
})
