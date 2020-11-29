'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DIR_SUBSCRIBERS = exports.DIR_MIGRATIONS = exports.DIR_ENTITIES = exports.DB_SUBSCRIBERS = exports.DB_MIGRATIONS = exports.DB_ENTITIES = exports.AWS_RDS_INIT_DB = exports.AWS_RDS_PASSWORD = exports.AWS_RDS_USERNAME = exports.AWS_RDS_HOST = exports.BASE_API_URL = exports.JWT_SECRET = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = exports.PORT = void 0;
exports.PORT = process.env.PORT || 3000;
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
exports.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.BASE_API_URL = process.env.BASE_API_URL || 'http://localhost:3000';
exports.AWS_RDS_HOST = process.env.AWS_RDS_HOST;
exports.AWS_RDS_USERNAME = process.env.AWS_RDS_USERNAME;
exports.AWS_RDS_PASSWORD = process.env.AWS_RDS_PASSWORD;
exports.AWS_RDS_INIT_DB = process.env.AWS_RDS_INIT_DB;
exports.DB_ENTITIES = process.env.DB_ENTITIES;
exports.DB_MIGRATIONS = process.env.DB_MIGRATIONS;
exports.DB_SUBSCRIBERS = process.env.DB_SUBSCRIBERS;
exports.DIR_ENTITIES = process.env.DIR_ENTITIES;
exports.DIR_MIGRATIONS = process.env.DIR_MIGRATIONS;
exports.DIR_SUBSCRIBERS = process.env.DIR_SUBSCRIBERS;
//# sourceMappingURL=baseConfig.js.map
