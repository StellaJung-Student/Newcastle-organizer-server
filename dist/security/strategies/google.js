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
const passport_google_oauth20_1 = require('passport-google-oauth20');
const baseConfig_1 = require('../../configs/baseConfig');
const typeorm_1 = require('typeorm');
const User_1 = __importDefault(require('../../models/User'));
const strategy = () => {
  passport_1.default.use(
    new passport_google_oauth20_1.Strategy(
      {
        clientID: baseConfig_1.GOOGLE_CLIENT_ID,
        clientSecret: baseConfig_1.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback',
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      },
      function (accessToken, refreshToken, profile, cb) {
        return __awaiter(this, void 0, void 0, function* () {
          const userRepository = typeorm_1.getRepository(User_1.default);
          try {
            let user = yield userRepository.findOne({
              where: {
                id: 1,
              },
            });
            if (user != null) {
              return cb(null, user);
            } else {
              user = new User_1.default(profile.emails[0].value, '', '', '', profile.username || '', profile.id, '');
              user = yield userRepository.save(user);
              return cb(null, user);
            }
          } catch (e) {
            return cb(e, null);
          }
        });
      }
    )
  );
};
exports.strategy = strategy;
//# sourceMappingURL=google.js.map
