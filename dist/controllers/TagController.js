'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const typeorm_1 = require('typeorm');
const Project_1 = __importDefault(require('../models/Project'));
const Tag_1 = __importDefault(require('../models/Tag'));
class TagController {
  /**
   * Get all the projects
   * @param req
   * @param res
   * @param next
   */
  static findTagByProjectId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
      const { projectId } = req.params;
      const projectRepository = typeorm_1.getRepository(Tag_1.default);
      try {
        const projects = yield projectRepository.find({
          where: {
            projectId: projectId,
          },
        });
        if (projects.length === 0) {
          return res.status(200).json([]);
        }
        return res.status(200).json(projects);
      } catch (e) {
        return res.status(500).json(e);
      }
    });
  }
  /**
   * Find tag by id
   * @param req
   * @param res
   * @param next
   */
  static findTagByIdAndProjectId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
      const { id, projectId } = req.params;
      const projectRepository = typeorm_1.getRepository(Tag_1.default);
      try {
        const tag = yield projectRepository.findOne({
          where: {
            id: id,
            projectId: projectId,
          },
        });
        if (tag) {
          return res.status(200).json(tag);
        }
        return res.status(404).json({
          message: `There is no tag with id: ${id}`,
        });
      } catch (e) {
        return res.status(500).json(e);
      }
    });
  }
  /**
   * Save tag to project according to project id
   * @param req
   * @param res
   * @param next
   */
  static saveTag(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
      const { projectId } = req.params;
      const tagRepository = typeorm_1.getRepository(Tag_1.default);
      const projectRepository = typeorm_1.getRepository(Project_1.default);
      const { title = '', color = 'red' } = req.body;
      let tag = new Tag_1.default(title, color);
      try {
        tag.project = yield projectRepository.findOne({
          where: {
            id: projectId,
          },
        });
        tag = yield tagRepository.save(tag);
        return res.status(201).send({
          id: tag.id,
        });
      } catch (e) {
        console.log(e);
        return res.status(500).json(e);
      }
    });
  }
  /**
   * Update tag to project according to project id
   * @param req
   * @param res
   * @param next
   */
  static updateTagByProjectId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
      const tagRepository = typeorm_1.getRepository(Tag_1.default);
      const { id, title = '', color = '' } = req.body;
      const tag = new Tag_1.default(title, color);
      try {
        yield tagRepository.update(id, tag);
        return res.status(200).json(tag);
      } catch (e) {
        console.log(e);
        return res.status(500).json(e);
      }
    });
  }
  /**
   * Delete tag to project according to project id
   * @param req
   * @param res
   * @param next
   */
  static deleteTagById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
      const { tagId } = req.params;
      const tagRepository = typeorm_1.getRepository(Tag_1.default);
      try {
        yield tagRepository.delete(tagId);
        return res.status(204);
      } catch (e) {
        console.log(e);
        return res.status(500).json(e);
      }
    });
  }
}
exports.default = TagController;
//# sourceMappingURL=TagController.js.map
