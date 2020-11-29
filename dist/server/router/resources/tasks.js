'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = require('express');
var TaskController_1 = __importDefault(require('../../controllers/TaskController'));
var TaskRouter = express_1.Router();
TaskRouter.get(
  '/projectLists/:projectListId/tasks/:taskId',
  //passport.authenticate('jwt', { session: false }),
  TaskController_1.default.findTaskById
);
TaskRouter.post(
  '/projectLists/:projectListId/tasks',
  //passport.authenticate('jwt', { session: false }),
  TaskController_1.default.saveTask
);
TaskRouter.patch(
  '/projectLists/:projectListId/tasks',
  //passport.authenticate('jwt', { session: false }),
  TaskController_1.default.updateTaskByProjectId
);
TaskRouter.delete(
  '/projectLists/:projectListId/tasks/:taskId',
  //passport.authenticate('jwt', { session: false }),
  TaskController_1.default.deleteTaskById
);
exports.default = TaskRouter;
//# sourceMappingURL=tasks.js.map
