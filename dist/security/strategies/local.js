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
exports.strategy = void 0;
const passport_1 = __importDefault(require('passport'));
const passport_local_1 = require('passport-local');
const typeorm_1 = require('typeorm');
const User_1 = __importDefault(require('../../models/User'));
const bcrypt_1 = require('../../helpers/bcrypt');
const strategy = () => {
  passport_1.default.use(
    new passport_local_1.Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      function (email, password, done) {
        return __awaiter(this, void 0, void 0, function* () {
          const userRepository = typeorm_1.getRepository(User_1.default);
          try {
            const user = yield userRepository.findOne({
              where: {
                email,
              },
            });
            if (!user) {
              return done(null, false);
            }
            if (!(yield bcrypt_1.comparePassword(password, user.password))) {
              return done(null, false);
            }
            return done(null, user);
          } catch (e) {
            return done(e);
          }
        });
      }
    )
  );
};
exports.strategy = strategy;
//# sourceMappingURL=local.js.map
