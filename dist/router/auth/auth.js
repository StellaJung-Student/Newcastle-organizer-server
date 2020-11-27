'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const passport_1 = __importDefault(require('passport'));
const AuthController_1 = __importDefault(require('../../controllers/AuthController'));
const AuthRouter = express_1.Router();
AuthRouter.post('/signup', AuthController_1.default.signUp);
AuthRouter.post('/login', AuthController_1.default.login);
//TODO: Testing purpose, delete later
AuthRouter.get('/secret', passport_1.default.authenticate('jwt', { session: false }), function (req, res) {
  res.json('Success! You can not see this without a token');
});
exports.default = AuthRouter;
//# sourceMappingURL=auth.js.map
