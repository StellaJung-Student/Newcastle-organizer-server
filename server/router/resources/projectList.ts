import { Router } from 'express';
import ProjectListController from '../../controllers/ProjectListController';

const ProjectListRouter = Router();

ProjectListRouter.get(
  '/projects/:projectId/projectLists',
  //passport.authenticate('jwt', { session: false }),
  ProjectListController.findAllProjectsListByProjectId
);

ProjectListRouter.post(
  '/projects/:projectId/projectLists/:projectListId',
  //passport.authenticate('jwt', { session: false }),
  ProjectListController.findProjectListByIdByProjectId
);

ProjectListRouter.patch(
  '/projects/:projectId/projectLists',
  //isCorrectToken,
  ProjectListController.saveProjectList
);

ProjectListRouter.delete(
  '/projectLists/:projectListId',
  //isCorrectToken,
  ProjectListController.deleteProjectListById
);

export default ProjectListRouter;
