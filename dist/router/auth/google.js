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
const express_1 = require('express');
const passport_1 = __importDefault(require('passport'));
const jwt_1 = require('../../helpers/jwt');
const googleAuthRouter = express_1.Router();
googleAuthRouter.get(
  '',
  passport_1.default.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
  })
);
googleAuthRouter.get(
  '/callback',
  passport_1.default.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const user = req.user;
    return res
      .status(200)
      .cookie('jwt', jwt_1.signToken(user), {
        httpOnly: true,
      })
      .redirect('/');
  }
);
googleAuthRouter.get('/logout', (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      req.logOut();
      res.status(204);
    } catch (e) {
      res.status(500).json(e);
    }
  })
);
exports.default = googleAuthRouter;
//# sourceMappingURL=google.js.map
