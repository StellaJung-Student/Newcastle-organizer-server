'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = require('express');
var AuthController_1 = __importDefault(require('../../controllers/AuthController'));
var AuthRouter = express_1.Router();
AuthRouter.post('/signup', AuthController_1.default.signUp);
AuthRouter.post('/login', AuthController_1.default.login);
AuthRouter.post('/refresh', AuthController_1.default.refresh);
exports.default = AuthRouter;
//# sourceMappingURL=auth.js.map
