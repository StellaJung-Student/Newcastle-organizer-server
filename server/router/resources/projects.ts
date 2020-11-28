import { Router } from 'express';
import ProjectController from '../../controllers/ProjectController';
import passport from 'passport';

const ProjectRouter = Router();

ProjectRouter.get('/', ProjectController.findAllProjects);
ProjectRouter.get('/:id', passport.authenticate('jwt', { session: false }), ProjectController.findProjectById);
ProjectRouter.post('/', passport.authenticate('jwt', { session: false }), ProjectController.saveProject);
//ProjectRouter.patch('/', isCorrectToken,ProjectController.updateProject)
//ProjectRouter.delete('/', isCorrectToken,ProjectController.deleteProject)

export default ProjectRouter;
