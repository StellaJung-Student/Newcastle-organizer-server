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
const passport_1 = __importDefault(require('passport'));
const User_1 = __importDefault(require('../models/User'));
const typeorm_1 = require('typeorm');
const google_1 = require('./strategies/google');
const local_1 = require('./strategies/local');
const jwt_1 = require('./strategies/jwt');
google_1.strategy();
local_1.strategy();
jwt_1.strategy();
passport_1.default.serializeUser(function (user, done) {
  done(null, user);
});
passport_1.default.deserializeUser(function (id, done) {
  return __awaiter(this, void 0, void 0, function* () {
    const userRepository = typeorm_1.getRepository(User_1.default);
    try {
      const user = yield userRepository.findOne({
        where: {
          id,
        },
      });
      done(null, user);
    } catch (e) {
      done(e, null);
    }
  });
});
//# sourceMappingURL=passport.js.map
