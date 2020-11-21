import { Router } from 'express';
import TaskController from '../../controllers/TaskController';
import passport from 'passport';

const TaskRouter = Router();

TaskRouter.get(
  '/projects/:projectId/tasks/:taskId',
  passport.authenticate('jwt', { session: false }),
  TaskController.findTaskByProjectId
);
TaskRouter.get(
  '/projects/:projectId/tasks',
  passport.authenticate('jwt', { session: false }),
  TaskController.findTaskByIdAndProjectId
);
TaskRouter.post(
  '/projects/:projectId/tasks',
  passport.authenticate('jwt', { session: false }),
  TaskController.saveTask
);
TaskRouter.patch(
  '/projects/:projectId/tasks',
  passport.authenticate('jwt', { session: false }),
  TaskController.updateTaskByProjectId
);
TaskRouter.delete('/', passport.authenticate('jwt', { session: false }), TaskController.deleteTaskById);

export default TaskRouter;
