'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = require('express');
var ProjectController_1 = __importDefault(require('../../controllers/ProjectController'));
var passport_1 = __importDefault(require('passport'));
var ProjectRouter = express_1.Router();
ProjectRouter.get('/', ProjectController_1.default.findAllProjects);
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
//ProjectRouter.patch('/', isCorrectToken,ProjectController.updateProject)
//ProjectRouter.delete('/', isCorrectToken,ProjectController.deleteProject)
exports.default = ProjectRouter;
//# sourceMappingURL=projects.js.map
