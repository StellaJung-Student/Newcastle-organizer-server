import { Router } from 'express';
import passport from 'passport';
import ProjectController from '../../../controllers/ProjectController';

const ProjectRouter = Router();

ProjectRouter.get('/', passport.authenticate('jwt', { session: false }), ProjectController.findAllProjectsOfUser);
ProjectRouter.get('/:id', passport.authenticate('jwt', { session: false }), ProjectController.findProjectById);
ProjectRouter.post('/', passport.authenticate('jwt', { session: false }), ProjectController.saveProject);
ProjectRouter.patch('/', passport.authenticate('jwt', { session: false }), ProjectController.updateProject);
ProjectRouter.delete('/', passport.authenticate('jwt', { session: false }), ProjectController.deleteProject);

export default ProjectRouter;
