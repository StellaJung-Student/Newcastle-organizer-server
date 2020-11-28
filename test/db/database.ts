import { createConnection } from 'typeorm';
import { AWS_RDS_HOST, AWS_RDS_INIT_DB, AWS_RDS_PASSWORD, AWS_RDS_USERNAME } from '../../server/configs/baseConfig';

createConnection({
  type: 'postgres',
  host: AWS_RDS_HOST,
  port: 5432,
  username: AWS_RDS_USERNAME,
  password: AWS_RDS_PASSWORD,
  database: AWS_RDS_INIT_DB,
  synchronize: true,
  logging: true,
  entities: ['dist/models/**/*.*'],
  migrations: ['dist/migration/**/*.*'],
  subscribers: ['dist/subscriber/**/*.*'],
  cli: {
    entitiesDir: 'dist/models',
    migrationsDir: 'dist/migration',
    subscribersDir: 'dist/subscriber',
  },
})
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => console.log(error));
