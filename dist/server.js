'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
require('dotenv/config');
require('./security/passport');
const app_1 = __importDefault(require('./app'));
const typeorm_1 = require('typeorm');
const baseConfig_1 = require('./configs/baseConfig');
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
  .then(() => {
    console.log('Database connected');
    app_1.default.listen(baseConfig_1.PORT, () =>
      __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Server is running on port ${baseConfig_1.PORT}`);
      })
    );
  })
  .catch((error) => console.log(error));
//# sourceMappingURL=server.js.map
