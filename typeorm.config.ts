import { CONNECTION } from 'src/app/db.connection';
import { DataSource } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const AppDataSource = new DataSource({
  ...CONNECTION,
  entities: ['*/**/*.entity.ts'],
  //  migrations:['/dist/']
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
