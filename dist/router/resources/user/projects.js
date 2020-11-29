'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = require('express');
var passport_1 = __importDefault(require('passport'));
var ProjectController_1 = __importDefault(require('../../../controllers/ProjectController'));
var ProjectRouter = express_1.Router();
ProjectRouter.get(
  '/',
  passport_1.default.authenticate('jwt', { session: false }),
  ProjectController_1.default.findAllProjectsOfUser
);
ProjectRouter.get(
  '/:id',
  passport_1.default.authenticate('jwt', { session: false }),
  ProjectController_1.default.findProjectById
);
ProjectRouter.post(
  '/',
  passport_1.default.authenticate('jwt', { session: false }),
  ProjectController_1.default.saveProject
);
ProjectRouter.patch(
  '/',
  passport_1.default.authenticate('jwt', { session: false }),
  ProjectController_1.default.updateProject
);
ProjectRouter.delete(
  '/',
  passport_1.default.authenticate('jwt', { session: false }),
  ProjectController_1.default.deleteProject
);
exports.default = ProjectRouter;
//# sourceMappingURL=projects.js.map
