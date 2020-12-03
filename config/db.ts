import path from 'path'
import { createConnection } from 'typeorm'
createConnection({
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: false,
	logging: false,
	uuidExtension: 'pgcrypto',
	entities: [
		path.join(__dirname, '../entities/**.ts')
	]
})
