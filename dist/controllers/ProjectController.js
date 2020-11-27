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
class ProjectController {
  /**
   * Get all the projects
   * @param req
   * @param res
   * @param next
   */
  static findAllProjects(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
      const projectRepository = typeorm_1.getRepository(Project_1.default);
      try {
        const projects = yield projectRepository.find({
          where: {
            publicStatus: true,
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
   * Find project by id
   * @param req
   * @param res
   * @param next
   */
  static findProjectById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
      const { id } = req.params;
      const projectRepository = typeorm_1.getRepository(Project_1.default);
      try {
        const project = yield projectRepository.findOne({
          where: {
            id: id,
            publicStatus: null,
          },
        });
        if (project) {
          return res.status(200).json(project);
        }
        return res.status(404).json({
          message: `There is no project with id: ${id}`,
        });
      } catch (e) {
        return res.status(500).json(e);
      }
    });
  }
  static saveProject(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
      const projectRepository = typeorm_1.getRepository(Project_1.default);
      const { title = '', description = '', imageUrl = '', publicStatus = true, tags = [] } = req.body;
      const user = req.user;
      let project = new Project_1.default(title, description, imageUrl, publicStatus, tags);
      project.owner = user;
      project.members = [user];
      try {
        project = yield projectRepository.save(project);
        //await userRepository.save(user);
        return res.status(201).send({
          id: project.id,
        });
      } catch (e) {
        console.log(e);
        return res.status(500).json(e);
      }
    });
  }
}
exports.default = ProjectController;
//# sourceMappingURL=ProjectController.js.map
