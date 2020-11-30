import { Router } from 'express';
import ProjectListController from '../../controllers/ProjectListController';
import passport from 'passport';

const ProjectListRouter = Router();

ProjectListRouter.get(
  '/projects/:projectId/projectLists',
  passport.authenticate('jwt', { session: false }),
  ProjectListController.findAllProjectsListByProjectId
);

ProjectListRouter.post(
  '/projects/:projectId/projectLists',
  passport.authenticate('jwt', { session: false }),
  ProjectListController.saveProjectList
);

ProjectListRouter.patch(
  '/projects/:projectId/projectLists',
  passport.authenticate('jwt', { session: false }),
  ProjectListController.updateProjectList
);

ProjectListRouter.delete(
  '/projects/:projectId/projectLists/:projectListId',
  passport.authenticate('jwt', { session: false }),
  ProjectListController.deleteProjectListById
);

export default ProjectListRouter;
