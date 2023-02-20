import { CONNECTION } from './src/app/db.connection';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

console.log('Connection to ' + process.env.POSTGRES_DB);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const AppDataSource = new DataSource({
  ...CONNECTION,
  entities: ['*/**/*.entity.ts'],
  synchronize: true,
  migrations: ['src/migrations/auto/*.ts'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
