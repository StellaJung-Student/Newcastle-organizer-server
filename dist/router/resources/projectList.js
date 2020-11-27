'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const ProjectListController_1 = __importDefault(require('../../controllers/ProjectListController'));
const ProjectListRouter = express_1.Router();
ProjectListRouter.get(
  '/projects/:projectId/projectLists',
  //passport.authenticate('jwt', { session: false }),
  ProjectListController_1.default.findAllProjectsListByProjectId
);
ProjectListRouter.post(
  '/projects/:projectId/projectLists',
  //passport.authenticate('jwt', { session: false }),
  ProjectListController_1.default.saveProjectList
);
ProjectListRouter.patch(
  '/projects/:projectId/projectLists',
  //isCorrectToken,
  ProjectListController_1.default.updateProjectList
);
ProjectListRouter.delete(
  '/projects/:projectId/projectLists/:projectListId',
  //isCorrectToken,
  ProjectListController_1.default.deleteProjectListById
);
exports.default = ProjectListRouter;
//# sourceMappingURL=projectList.js.map
