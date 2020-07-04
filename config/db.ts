import { createConnection } from "typeorm";
createConnection({
    type: "postgres",
    url: process.env.TYPEORM_URL,
    synchronize: false,
    logging: false,
    uuidExtension: 'pgcrypto',
    entities: [
        __dirname + '/../**/**.entity{.ts,.js}'
    ]
})