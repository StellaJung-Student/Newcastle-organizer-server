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
exports.isCorrectToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const baseConfig_1 = require('../configs/baseConfig');
/**
 * Sign token
 * @param user the user
 */
exports.signToken = (user) => {
  //Delete password property
  delete user.password;
  return jsonwebtoken_1.default.sign({ data: user }, baseConfig_1.JWT_SECRET, {
    expiresIn: 300,
  });
};
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.isCorrectToken = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (token) {
      const onlyToken = token.slice(7, token.length);
      try {
        req.user = yield jsonwebtoken_1.default.verify(onlyToken, baseConfig_1.JWT_SECRET);
        next();
        return;
      } catch (err) {
        if (err) return res.status(401).send({ msg: 'Invalid Token' });
      }
    } else return res.status(401).send({ msg: 'Token is not supplied' });
  });
//# sourceMappingURL=jwt.js.map
