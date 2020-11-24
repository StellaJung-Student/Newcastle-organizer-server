import { Router } from 'express';
import ProjectListController from '../../controllers/ProjectListController';

const ProjectListRouter = Router();

ProjectListRouter.get(
  '/projects/:projectId/projectLists',
  //passport.authenticate('jwt', { session: false }),
  ProjectListController.findAllProjectsListByProjectId
);

ProjectListRouter.post(
  '/projects/:projectId/projectLists',
  //passport.authenticate('jwt', { session: false }),
  ProjectListController.saveProjectList
);

ProjectListRouter.patch(
  '/projects/:projectId/projectLists',
  //isCorrectToken,
  ProjectListController.updateProjectList
);

ProjectListRouter.delete(
  '/projects/:projectId/projectLists/:projectListId',
  //isCorrectToken,
  ProjectListController.deleteProjectListById
);

export default ProjectListRouter;
