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
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var typeorm_1 = require('typeorm');
var ProjectList_1 = __importDefault(require('../models/ProjectList'));
var Project_1 = __importDefault(require('../models/Project'));
/**
 * Project list controller
 */
var ProjectListController = /** @class */ (function () {
  function ProjectListController() {}
  /**
   * Get all the projectLists
   * @param req
   * @param res
   */
  ProjectListController.findAllProjectsListByProjectId = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      var projectId, projectListRepository, projectRepository, project, projectLists, e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            projectId = req.params.projectId;
            projectListRepository = typeorm_1.getRepository(ProjectList_1.default);
            projectRepository = typeorm_1.getRepository(Project_1.default);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 4, , 5]);
            return [
              4 /*yield*/,
              projectRepository.findOne({
                where: {
                  id: projectId,
                },
              }),
            ];
          case 2:
            project = _a.sent();
            return [
              4 /*yield*/,
              projectListRepository.find({
                relations: ['tasks', 'tasks.comments'],
                order: {
                  id: 'ASC',
                },
                where: {
                  project: project,
                },
              }),
            ];
          case 3:
            projectLists = _a.sent();
            if (projectLists.length === 0) {
              return [2 /*return*/, res.status(200).json([])];
            }
            return [2 /*return*/, res.status(200).json(projectLists)];
          case 4:
            e_1 = _a.sent();
            return [2 /*return*/, res.status(500).json(e_1)];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Find projectList by id
   * @param req
   * @param res
   */
  ProjectListController.findProjectListByIdByProjectId = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      var id, projectListRepository, projectList, e_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            id = req.params.id;
            projectListRepository = typeorm_1.getRepository(ProjectList_1.default);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [
              4 /*yield*/,
              projectListRepository.findOne({
                where: {
                  id: id,
                },
              }),
            ];
          case 2:
            projectList = _a.sent();
            if (projectList) {
              return [2 /*return*/, res.status(200).json(projectList)];
            }
            return [
              2 /*return*/,
              res.status(404).json({
                message: 'There is no projectList with id: ' + id,
              }),
            ];
          case 3:
            e_2 = _a.sent();
            return [2 /*return*/, res.status(500).json(e_2)];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Save project list
   * @param req
   * @param res
   */
  ProjectListController.saveProjectList = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      var projectId, projectRepository, projectListRepository, _a, title, projectList, _b, e_3;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            projectId = req.params.projectId;
            projectRepository = typeorm_1.getRepository(Project_1.default);
            projectListRepository = typeorm_1.getRepository(ProjectList_1.default);
            (_a = req.body.title), (title = _a === void 0 ? '' : _a);
            projectList = new ProjectList_1.default();
            projectList.title = title;
            _c.label = 1;
          case 1:
            _c.trys.push([1, 4, , 5]);
            _b = projectList;
            return [
              4 /*yield*/,
              projectRepository.findOne({
                where: {
                  id: projectId,
                },
              }),
            ];
          case 2:
            _b.project = _c.sent();
            projectList.tasks = [];
            return [4 /*yield*/, projectListRepository.save(projectList)];
          case 3:
            projectList = _c.sent();
            return [
              2 /*return*/,
              res.status(201).send({
                id: projectList.id,
              }),
            ];
          case 4:
            e_3 = _c.sent();
            console.log(e_3);
            return [2 /*return*/, res.status(500).json(e_3)];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Save project list
   * @param req
   * @param res
   */
  ProjectListController.updateProjectList = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      var projectListRepository, _a, id, _b, title, _c, tasks, projectList, e_4;
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            projectListRepository = typeorm_1.getRepository(ProjectList_1.default);
            (_a = req.body),
              (id = _a.id),
              (_b = _a.title),
              (title = _b === void 0 ? '' : _b),
              (_c = _a.tasks),
              (tasks = _c === void 0 ? [] : _c);
            projectList = new ProjectList_1.default();
            projectList.title = title;
            projectList.tasks = tasks;
            projectList.id = id;
            _d.label = 1;
          case 1:
            _d.trys.push([1, 3, , 4]);
            return [4 /*yield*/, projectListRepository.save(projectList)];
          case 2:
            _d.sent();
            return [2 /*return*/, res.status(200).json(projectList)];
          case 3:
            e_4 = _d.sent();
            console.log(e_4);
            return [2 /*return*/, res.status(500).json(e_4)];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Delete project list project list id
   * @param req
   * @param res
   */
  ProjectListController.deleteProjectListById = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      var projectListId, projectListRepository, e_5;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            projectListId = req.params.projectListId;
            projectListRepository = typeorm_1.getRepository(ProjectList_1.default);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [4 /*yield*/, projectListRepository.delete(projectListId)];
          case 2:
            _a.sent();
            return [2 /*return*/, res.status(204).json('ok')];
          case 3:
            e_5 = _a.sent();
            console.log(e_5);
            return [2 /*return*/, res.status(500).json(e_5)];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  return ProjectListController;
})();
exports.default = ProjectListController;
//# sourceMappingURL=ProjectListController.js.map
