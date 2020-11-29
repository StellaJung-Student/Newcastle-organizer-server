'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = require('express');
var TagController_1 = __importDefault(require('../../controllers/TagController'));
var passport_1 = __importDefault(require('passport'));
var TagRouter = express_1.Router();
TagRouter.get(
  '/projects/:projectId/tags/:tagId',
  passport_1.default.authenticate('jwt', { session: false }),
  TagController_1.default.findTagByProjectId
);
TagRouter.get(
  '/projects/:projectId/tags',
  passport_1.default.authenticate('jwt', { session: false }),
  TagController_1.default.findTagByIdAndProjectId
);
TagRouter.post(
  '/projects/:projectId/tags',
  passport_1.default.authenticate('jwt', { session: false }),
  TagController_1.default.saveTag
);
TagRouter.patch(
  '/projects/:projectId/tags',
  passport_1.default.authenticate('jwt', { session: false }),
  TagController_1.default.updateTagByProjectId
);
TagRouter.delete(
  '/:tagId',
  passport_1.default.authenticate('jwt', { session: false }),
  TagController_1.default.deleteTagById
);
exports.default = TagRouter;
//# sourceMappingURL=tags.js.map
