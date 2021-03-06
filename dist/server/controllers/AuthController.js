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
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var typeorm_1 = require('typeorm');
var User_1 = __importDefault(require('../models/User'));
var bcrypt_1 = require('../helpers/bcrypt');
var jwt_1 = require('../helpers/jwt');
var uuid_1 = require('uuid');
var RefreshToken_1 = __importDefault(require('../models/RefreshToken'));
var AuthController = /** @class */ (function () {
  function AuthController() {}
  /**
   * User sign up
   * @param req
   * @param res
   */
  AuthController.signUp = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
      var _a, _b, firstname, _c, lastname, _d, username, email, password, userRepository, hashedPassword, e_1;
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            (_a = req.body),
              (_b = _a.firstname),
              (firstname = _b === void 0 ? '' : _b),
              (_c = _a.lastname),
              (lastname = _c === void 0 ? '' : _c),
              (_d = _a.username),
              (username = _d === void 0 ? '' : _d),
              (email = _a.email),
              (password = _a.password);
            //Verify if user enter
            if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
              return [2 /*return*/, res.status(500).json({ success: false, data: 'Enter a valid email address.' })];
            } else if (password.length < 5 || password.length > 20) {
              return [
                2 /*return*/,
                res.status(500).json({
                  success: false,
                  data: 'Password must be between 5 and 20 characters.',
                }),
              ];
            }
            userRepository = typeorm_1.getRepository(User_1.default);
            _e.label = 1;
          case 1:
            _e.trys.push([1, 4, , 5]);
            return [4 /*yield*/, bcrypt_1.hashPassword(password)];
          case 2:
            hashedPassword = _e.sent();
            return [
              4 /*yield*/,
              userRepository.save(new User_1.default(email, hashedPassword, firstname, lastname, username, null, null)),
            ];
          case 3:
            _e.sent();
            res.status(201).json({
              message: 'Account created',
            });
            return [3 /*break*/, 5];
          case 4:
            e_1 = _e.sent();
            console.log(e_1);
            res.status(500).json(e_1);
            return [3 /*break*/, 5];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Log in for the user
   * @param req
   * @param res
   */
  AuthController.login = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
      var _a, email, password, user, isPasswordMatched, token, refreshTokenModel, refreshToken, e_2;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            (_a = req.body), (email = _a.email), (password = _a.password);
            return [4 /*yield*/, typeorm_1.getRepository(User_1.default).findOne({ email: email })];
          case 1:
            user = _b.sent();
            if (!user) {
              return [2 /*return*/, res.status(401).json({ message: 'no such user found' })];
            }
            _b.label = 2;
          case 2:
            _b.trys.push([2, 7, , 8]);
            return [4 /*yield*/, bcrypt_1.comparePassword(password, user.password)];
          case 3:
            isPasswordMatched = _b.sent();
            if (!isPasswordMatched) return [3 /*break*/, 5];
            token = jwt_1.signToken(user);
            delete user.firstname;
            delete user.lastname;
            delete user.password;
            delete user.email;
            delete user.googleId;
            delete user.facebookId;
            refreshTokenModel = new RefreshToken_1.default();
            refreshToken = uuid_1.v4();
            refreshTokenModel.refreshToken = refreshToken;
            refreshTokenModel.user = user;
            return [4 /*yield*/, typeorm_1.getRepository(RefreshToken_1.default).save(refreshTokenModel)];
          case 4:
            _b.sent();
            return [
              2 /*return*/,
              res
                .cookie('refreshToken', refreshToken, {
                  httpOnly: true,
                })
                .json({ user: user, accessToken: token }),
            ];
          case 5:
            return [2 /*return*/, res.status(401).json({ message: 'passwords did not match' })];
          case 6:
            return [3 /*break*/, 8];
          case 7:
            e_2 = _b.sent();
            return [2 /*return*/, res.status(500).json(e_2)];
          case 8:
            return [2 /*return*/];
        }
      });
    });
  };
  AuthController.refresh = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
      var refreshToken, refreshTokenModel, user, token, e_3;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            refreshToken = req.cookies.refreshToken;
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [
              4 /*yield*/,
              typeorm_1.getRepository(RefreshToken_1.default).findOne({
                where: {
                  refreshToken: refreshToken,
                },
              }),
            ];
          case 2:
            refreshTokenModel = _a.sent();
            user = refreshTokenModel.user;
            if (user) {
              token = jwt_1.signToken(user);
              delete user.firstname;
              delete user.lastname;
              delete user.password;
              delete user.email;
              delete user.googleId;
              delete user.facebookId;
              return [
                2 /*return*/,
                res.status(200).json({
                  accessToken: token,
                }),
              ];
            }
            return [
              2 /*return*/,
              res.status(403).json({
                message: 'Cannot be accessed',
              }),
            ];
          case 3:
            e_3 = _a.sent();
            res.status(500).json(e_3);
            return [3 /*break*/, 4];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  return AuthController;
})();
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map
