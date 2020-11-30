import { Router } from 'express';
import TaskController from '../../controllers/TaskController';
import passport from 'passport';

const TaskRouter = Router();

TaskRouter.get(
  '/projectLists/:projectListId/tasks/:taskId',
  passport.authenticate('jwt', { session: false }),
  TaskController.findTaskById
);

TaskRouter.post(
  '/projectLists/:projectListId/tasks',
  passport.authenticate('jwt', { session: false }),
  TaskController.saveTask
);
TaskRouter.patch(
  '/projectLists/:projectListId/tasks',
  passport.authenticate('jwt', { session: false }),
  TaskController.updateTaskByProjectId
);
TaskRouter.delete(
  '/projectLists/:projectListId/tasks/:taskId',
  //passport.authenticate('jwt', { session: false }),
  TaskController.deleteTaskById
);

export default TaskRouter;
