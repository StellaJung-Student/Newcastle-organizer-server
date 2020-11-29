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
var express_1 = __importStar(require('express'));
var passport_1 = __importDefault(require('passport'));
var cookie_parser_1 = __importDefault(require('cookie-parser'));
var auth_1 = __importDefault(require('./router/auth/auth'));
var google_1 = __importDefault(require('./router/auth/google'));
var cors_1 = __importDefault(require('cors'));
var projects_1 = __importDefault(require('./router/resources/projects'));
var projects_2 = __importDefault(require('./router/resources/user/projects'));
var tasks_1 = __importDefault(require('./router/resources/tasks'));
var tags_1 = __importDefault(require('./router/resources/tags'));
var projectList_1 = __importDefault(require('./router/resources/projectList'));
var cookie_session_1 = __importDefault(require('cookie-session'));
var app = express_1.default();
app.set('trust proxy', 1); // trust first proxy
app.use(
  cookie_session_1.default({
    name: 'session',
    keys: ['Hello', 'Holla'],
    secret: 'what the hell is this secret',
    httpOnly: false,
    secure: process.env.NODE_ENV !== 'development',
    domain: 'vercel.app',
    path: '/',
    expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 365),
  })
);
app.use(express_1.urlencoded({ extended: true }));
app.use(express_1.json());
app.use(cookie_parser_1.default());
app.use(
  cors_1.default({
    origin: ['https://newcastle-organizer.vercel.app', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);
app.use(passport_1.default.initialize());
/**
 * Dummy route
 */
app.get('/', function (req, res) {
  res.status(200).send({
    message: 'Hello!',
  });
});
app.use('/auth/google', google_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/projects', projects_1.default);
app.use('/api/user/projects', projects_2.default);
app.use('/api', tasks_1.default);
app.use('/api', projectList_1.default);
app.use('/api', tags_1.default);
app.use('*', function (req, res) {
  return res.status(404).send({ message: 'Nothing here!' });
});
exports.default = app;
//# sourceMappingURL=app.js.map
