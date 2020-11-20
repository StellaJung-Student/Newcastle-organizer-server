import { Router } from 'express';
import TagController from '../../controllers/TagController';
import passport from 'passport';

const TagRouter = Router();

TagRouter.get(
  '/projects/:projectId/tags/:tagId',
  passport.authenticate('jwt', { session: false }),
  TagController.findTagByProjectId
);
TagRouter.get(
  '/projects/:projectId/tags',
  passport.authenticate('jwt', { session: false }),
  TagController.findTagByIdAndProjectId
);
TagRouter.post('/projects/:projectId/tags', passport.authenticate('jwt', { session: false }), TagController.saveTag);
TagRouter.patch(
  '/projects/:projectId/tags',
  passport.authenticate('jwt', { session: false }),
  TagController.updateTagByProjectId
);
TagRouter.delete('/:tagId', passport.authenticate('jwt', { session: false }), TagController.deleteTagById);

export default TagRouter;
