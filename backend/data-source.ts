import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'trading.db',
    synchronize: true,
    logging: true,
    entities: [
        __dirname + '/**/*.entity{.ts,.js}',
    ],
    cache: {
        duration: 1000
      },
    subscribers: [],
    migrations: [],
});
