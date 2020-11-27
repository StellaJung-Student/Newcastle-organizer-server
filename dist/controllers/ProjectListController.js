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
const ProjectList_1 = __importDefault(require('../models/ProjectList'));
const Project_1 = __importDefault(require('../models/Project'));
/**
 * Project list controller
 */
class ProjectListController {
  /**
   * Get all the projectLists
   * @param req
   * @param res
   */
  static findAllProjectsListByProjectId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const { projectId } = req.params;
      const projectListRepository = typeorm_1.getRepository(ProjectList_1.default);
      const projectRepository = typeorm_1.getRepository(Project_1.default);
      try {
        const project = yield projectRepository.findOne({
          where: {
            id: projectId,
          },
        });
        const projectLists = yield projectListRepository.find({
          relations: ['tasks', 'tasks.comments'],
          order: {
            id: 'ASC',
          },
          where: {
            project: project,
          },
        });
        if (projectLists.length === 0) {
          return res.status(200).json([]);
        }
        return res.status(200).json(projectLists);
      } catch (e) {
        return res.status(500).json(e);
      }
    });
  }
  /**
   * Find projectList by id
   * @param req
   * @param res
   */
  static findProjectListByIdByProjectId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const { id } = req.params;
      const projectListRepository = typeorm_1.getRepository(ProjectList_1.default);
      try {
        const projectList = yield projectListRepository.findOne({
          where: {
            id: id,
          },
        });
        if (projectList) {
          return res.status(200).json(projectList);
        }
        return res.status(404).json({
          message: `There is no projectList with id: ${id}`,
        });
      } catch (e) {
        return res.status(500).json(e);
      }
    });
  }
  /**
   * Save project list
   * @param req
   * @param res
   */
  static saveProjectList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const { projectId } = req.params;
      const projectRepository = typeorm_1.getRepository(Project_1.default);
      const projectListRepository = typeorm_1.getRepository(ProjectList_1.default);
      const { title = '' } = req.body;
      let projectList = new ProjectList_1.default();
      projectList.title = title;
      try {
        projectList.project = yield projectRepository.findOne({
          where: {
            id: projectId,
          },
        });
        projectList.tasks = [];
        projectList = yield projectListRepository.save(projectList);
        return res.status(201).send({
          id: projectList.id,
        });
      } catch (e) {
        console.log(e);
        return res.status(500).json(e);
      }
    });
  }
  /**
   * Save project list
   * @param req
   * @param res
   */
  static updateProjectList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const projectListRepository = typeorm_1.getRepository(ProjectList_1.default);
      const { id, title = '', tasks = [] } = req.body;
      const projectList = new ProjectList_1.default();
      projectList.title = title;
      projectList.tasks = tasks;
      projectList.id = id;
      try {
        yield projectListRepository.save(projectList);
        return res.status(200).json(projectList);
      } catch (e) {
        console.log(e);
        return res.status(500).json(e);
      }
    });
  }
  /**
   * Delete project list project list id
   * @param req
   * @param res
   */
  static deleteProjectListById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const { projectListId } = req.params;
      const projectListRepository = typeorm_1.getRepository(ProjectList_1.default);
      try {
        yield projectListRepository.delete(projectListId);
        return res.status(204).json('ok');
      } catch (e) {
        console.log(e);
        return res.status(500).json(e);
      }
    });
  }
}
exports.default = ProjectListController;
//# sourceMappingURL=ProjectListController.js.map
