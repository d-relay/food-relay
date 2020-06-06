import { createConnection } from "typeorm";
createConnection({
    type: "postgres",
    url: process.env.TYPEORM_URL,
    synchronize: false,
    logging: true,
    uuidExtension: 'pgcrypto',
    entities: [
        __dirname + '/../**/**.entity{.ts,.js}'
    ]
})