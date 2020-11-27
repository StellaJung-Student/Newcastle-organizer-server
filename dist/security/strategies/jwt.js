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
const passport_jwt_1 = require('passport-jwt');
const baseConfig_1 = require('../../configs/baseConfig');
const typeorm_1 = require('typeorm');
const User_1 = __importDefault(require('../../models/User'));
const strategy = () => {
  passport_1.default.use(
    new passport_jwt_1.Strategy(
      {
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: baseConfig_1.JWT_SECRET,
      },
      function (jwt_payload, next) {
        return __awaiter(this, void 0, void 0, function* () {
          const userRepository = typeorm_1.getRepository(User_1.default);
          // usually this would be a database call:
          try {
            console.log(jwt_payload.data.id);
            const user = yield userRepository.findOne({
              where: {
                id: jwt_payload.data.id,
              },
            });
            if (user) {
              next(null, user);
            } else {
              next(null, false);
            }
          } catch (e) {
            next(e, false);
          }
        });
      }
    )
  );
};
exports.strategy = strategy;
//# sourceMappingURL=jwt.js.map
