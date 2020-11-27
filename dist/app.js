'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importStar(require('express'));
const passport_1 = __importDefault(require('passport'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const auth_1 = __importDefault(require('./router/auth/auth'));
const google_1 = __importDefault(require('./router/auth/google'));
const cors_1 = __importDefault(require('cors'));
const baseConfig_1 = require('./configs/baseConfig');
const projects_1 = __importDefault(require('./router/resources/projects'));
const tasks_1 = __importDefault(require('./router/resources/tasks'));
const tags_1 = __importDefault(require('./router/resources/tags'));
const projectList_1 = __importDefault(require('./router/resources/projectList'));
const app = express_1.default();
app.use(express_1.urlencoded({ extended: true }));
app.use(express_1.json());
app.use(cookie_parser_1.default());
app.use(
  cors_1.default({
    origin: baseConfig_1.BASE_API_URL,
    credentials: true,
  })
);
app.use(passport_1.default.initialize());
/**
 * Dummy route
 */
app.get('/', (req, res) => {
  res.status(200).send({
    data: 'Hello!',
  });
});
app.use('/auth/google', google_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/projects', projects_1.default);
app.use('/api', tasks_1.default);
app.use('/api', projectList_1.default);
app.use('/api', tags_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map
