import 'dotenv/config';
import './security/passport';
import app from './app';
import { createConnection } from 'typeorm';

import { AWS_RDS_HOST, AWS_RDS_INIT_DB, AWS_RDS_PASSWORD, AWS_RDS_USERNAME, PORT } from './configs/baseConfig';

createConnection({
  type: 'postgres',
  host: AWS_RDS_HOST,
  port: 5432,
  username: AWS_RDS_USERNAME,
  password: AWS_RDS_PASSWORD,
  database: AWS_RDS_INIT_DB,
  synchronize: true,
  logging: true,
  entities: ['server/models/**/*.*'],
  migrations: ['server/migration/**/*.*'],
  subscribers: ['server/subscriber/**/*.*'],
  cli: {
    entitiesDir: 'server/models',
    migrationsDir: 'server/migration',
    subscribersDir: 'server/subscriber',
  },
})
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
