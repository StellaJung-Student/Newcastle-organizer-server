'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var typeorm_1 = require('typeorm');
var baseConfig_1 = require('../../server/configs/baseConfig');
typeorm_1
  .createConnection({
    type: 'postgres',
    host: baseConfig_1.AWS_RDS_HOST,
    port: 5432,
    username: baseConfig_1.AWS_RDS_USERNAME,
    password: baseConfig_1.AWS_RDS_PASSWORD,
    database: baseConfig_1.AWS_RDS_INIT_DB,
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
  .then(function () {
    console.log('Database connected');
  })
  .catch(function (error) {
    return console.log(error);
  });
//# sourceMappingURL=database.js.map
